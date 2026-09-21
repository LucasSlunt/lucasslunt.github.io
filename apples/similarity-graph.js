'use strict';

const networkElement = document.querySelector('#similarity-network');
const statusElement = document.querySelector('#similarity-status');

function setStatus(message) {
	statusElement.textContent = message;
}

async function loadSimilarityNetwork() {
	try {
		const [applesResponse, recommendationsResponse] = await Promise.all([
			fetch('./data/apples.json'),
			fetch('./data/appleRecommendations.json')
		]);

		if (!applesResponse.ok || !recommendationsResponse.ok) {
			throw new Error('Could not load apple data');
		}

		const [apples, recommendations] = await Promise.all([
			applesResponse.json(),
			recommendationsResponse.json()
		]);
		const applesById = new Map(apples.map((apple) => [apple.id, apple]));
		const nodes = new vis.DataSet(apples.map((apple) => ({
			id: apple.id,
			label: apple.name,
			title: `${apple.name}`,
			shape: 'dot',
			font: { color: '#34261d', face: 'DM Sans', size: 18 },
			color: { background: '#cee89d', border: '#659f38', highlight: { background: '#f4ae69', border: '#aa572a' } },
			borderWidth: 2,
			size: 45,
			url: `./apple_pages/${apple.id}.html`
		})));
		const edges = new vis.DataSet(
			Object.entries(recommendations).flatMap(([sourceId, recommendedApples]) => recommendedApples
				.filter((recommendation) => applesById.has(recommendation.id))
				.map((recommendation) => ({
					from: Number(sourceId),
					to: recommendation.id,
					arrows: 'to',
					title: `${recommendation.differentiating_factor}: ${recommendation.comparison}`,
					color: { color: '#b86d3b', highlight: '#aa572a', opacity: 0.72 },
					width: 8,
					selectionWidth: 15
				})))
		);

		const network = new vis.Network(networkElement, { nodes, edges }, {
			interaction: { hover: true, navigationButtons: true, tooltipDelay: 120 },
			physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -120, springLength: 220, springConstant: 0.035, avoidOverlap: 0.8 }, stabilization: { iterations: 350 } },
			nodes: { chosen: true },
			edges: { smooth: { type: 'dynamic' } }
		});

		network.on('doubleClick', ({ nodes: selectedNodes }) => {
			if (selectedNodes.length === 1) {
				window.location.href = `./apple_pages/${selectedNodes[0]}.html`;
			}
		});
		setStatus(`${nodes.length} apple varieties and ${edges.length} directed recommendations`);
	} catch (error) {
		setStatus('The apple network could not be loaded.');
		console.error(error);
	}
}

loadSimilarityNetwork();