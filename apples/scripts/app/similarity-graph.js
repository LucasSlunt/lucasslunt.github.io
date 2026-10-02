'use strict';

const networkElement = document.querySelector('#similarity-network');

function interpolateColor(start, end, amount) {
	const channel = (index) => Math.round(start[index] + (end[index] - start[index]) * amount);
	return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function drawRoundedNode({ ctx, x, y, state }, nodeSize, texture, juiciness, colors, borderWidth) {
	const halfSize = nodeSize / 2;
	const radius = (1 - texture) * halfSize;
	const fillColor = state.hover || state.selected ? '#fff0f5' : colors.background;
	const borderColor = state.hover || state.selected ? '#65a52c' : colors.border;

	ctx.save();
	ctx.shadowColor = 'rgba(49, 102, 34, 0.84)';
	ctx.shadowBlur = (4 + juiciness * 18) * 2;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.beginPath();
	ctx.moveTo(x - halfSize + radius, y - halfSize);
	ctx.arcTo(x + halfSize, y - halfSize, x + halfSize, y + halfSize, radius);
	ctx.arcTo(x + halfSize, y + halfSize, x - halfSize, y + halfSize, radius);
	ctx.arcTo(x - halfSize, y + halfSize, x - halfSize, y - halfSize, radius);
	ctx.arcTo(x - halfSize, y - halfSize, x + halfSize, y - halfSize, radius);
	ctx.closePath();
	ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.shadowColor = 'transparent';
	ctx.lineWidth = state.selected ? borderWidth * 2 : borderWidth;
	ctx.strokeStyle = borderColor;
	ctx.stroke();
	ctx.restore();
}

function createNode(apple, vector) {
	const nodeSize = (18 + vector.size * 30) * 1.5;
	const colors = {
		background: interpolateColor([255, 255, 255], [255, 92, 152], vector.sweetness),
		border: interpolateColor([99, 157, 55], [166, 226, 43], vector.sourness)
	};
	const borderWidth = 1 + (vector.sourness+0.5)**2 * 9;

	return {
		id: apple.id,
		title: apple.name,
		label: '',
		shape: 'custom',
		ctxRenderer: (rendererOptions) => ({
			drawNode: () => drawRoundedNode(rendererOptions, nodeSize, vector.texture, vector.juiciness, colors, borderWidth),
			nodeDimensions: { width: nodeSize, height: nodeSize }
		}),
		widthConstraint: { minimum: nodeSize, maximum: nodeSize },
		heightConstraint: { minimum: nodeSize, maximum: nodeSize },
		size: nodeSize / 2,
		borderWidth,
		color: {
			background: colors.background,
			border: colors.border,
			highlight: { background: '#fff0f5', border: '#65a52c' }
		},
		shadow: {
			enabled: vector.juiciness > 0,
			color: 'rgba(49, 102, 34, 0.84)',
			size: (4 + vector.juiciness * 18) * 2,
			x: 0,
			y: 0
		},
		font: { color: '#34261d', face: 'DM Sans', size: 16 }
	};
}

async function loadSimilarityNetwork() {
	try {
		const [applesResponse, vectorsResponse, similaritiesResponse] = await Promise.all([
			fetch('./data/apples.json'),
			fetch('./data/generatedAppleData/appleVectors.json'),
			fetch('./data/generatedAppleData/appleSimilarities.json')
		]);

		if (!applesResponse.ok || !vectorsResponse.ok || !similaritiesResponse.ok) {
			throw new Error('Could not load apple data');
		}

		const [apples, vectors, similarities] = await Promise.all([
			applesResponse.json(),
			vectorsResponse.json(),
			similaritiesResponse.json()
		]);
		const applesById = new Map(apples.map((apple) => [apple.id, apple]));
		const nodes = new vis.DataSet(apples.map((apple) => createNode(apple, vectors[String(apple.id)])));
		const edges = new vis.DataSet(
			Object.entries(similarities).flatMap(([sourceId, scores]) => Object.entries(scores)
				.filter(([targetId, score]) => Number(sourceId) < Number(targetId) && applesById.has(Number(targetId)) && score <= 0.3)
				.map(([targetId]) => ({
					from: Number(sourceId),
					to: Number(targetId),
					color: { color: '#b8a99a', highlight: '#8b6a51', opacity: 0.72 },
					width: 1.5,
					selectionWidth: 3
				})))
		);

		const network = new vis.Network(networkElement, { nodes, edges }, {
			interaction: { hover: true, tooltipDelay: 120 },
			physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -90, springLength: 150, springConstant: 0.04, avoidOverlap: 1 }, stabilization: { iterations: 350 } },
			nodes: { chosen: true },
			edges: { smooth: false }
		});

		network.on('doubleClick', ({ nodes: selectedNodes }) => {
			if (selectedNodes.length === 1) {
				window.location.href = `./apple_pages/${selectedNodes[0]}.html`;
			}
		});
	} catch (error) {
		console.error(error);
	}
}

loadSimilarityNetwork();