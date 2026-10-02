'use strict';

const networkElement = document.querySelector('#similarity-network');
const statusElement = document.querySelector('#similarity-status');

function setStatus(message) {
	if (statusElement) {
		statusElement.textContent = message;
	}
}

function interpolateColor(start, end, amount) {
	const channel = (index) => Math.round(start[index] + (end[index] - start[index]) * amount);
	return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function createNode(apple, vector) {
	const nodeSize = 18 + vector.size * 30;
	const isCircular = vector.texture === 0;

	return {
		id: apple.id,
		title: apple.name,
		label: '',
		shape: isCircular ? 'circle' : 'box',
		widthConstraint: { minimum: nodeSize, maximum: nodeSize },
		heightConstraint: { minimum: nodeSize, maximum: nodeSize },
		borderRadius: (1 - vector.texture) * nodeSize / 2,
		size: nodeSize / 2,
		borderWidth: 1 + vector.sourness * 5,
		color: {
			background: interpolateColor([255, 255, 255], [255, 92, 152], vector.sweetness),
			border: interpolateColor([99, 157, 55], [166, 226, 43], vector.sourness),
			highlight: { background: '#fff0f5', border: '#65a52c' }
		},
		shadow: {
			enabled: vector.juiciness > 0,
			color: 'rgba(49, 102, 34, 0.42)',
			size: 4 + vector.juiciness * 18,
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
			interaction: { hover: true, navigationButtons: true, tooltipDelay: 120 },
			physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -90, springLength: 150, springConstant: 0.04, avoidOverlap: 1 }, stabilization: { iterations: 350 } },
			nodes: { chosen: true },
			edges: { smooth: false }
		});

		network.on('doubleClick', ({ nodes: selectedNodes }) => {
			if (selectedNodes.length === 1) {
				window.location.href = `./apple_pages/${selectedNodes[0]}.html`;
			}
		});
		setStatus(`${nodes.length} apple varieties connected by ${edges.length} similarities`);
	} catch (error) {
		setStatus('The apple network could not be loaded.');
		console.error(error);
	}
}

loadSimilarityNetwork();