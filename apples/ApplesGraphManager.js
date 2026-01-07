class ApplesGraphManager {
    constructor() {
        this.graphContainer = null;
        this.maxCount = 0;
        this.tableManager = null;
    }

    async initialize(tableManager) {
        this.tableManager = tableManager;
        this.graphContainer = document.getElementById('rating-graph-container');
        if (!this.graphContainer) return;

        try {
            const response = await fetch('./apples.json');
            if (!response.ok) throw new Error("Failed to load apple data");
            const apples = await response.json();
            this.renderGraph(apples);
        } catch (error) {
            console.error("Error loading graph data:", error);
            this.graphContainer.innerHTML = "<p>Could not load graph data.</p>";
        }
    }

    renderGraph(apples) {
        // Calculate frequencies for ratings 1-10
        const counts = new Array(11).fill(0); // Index 0 unused, 1-10 used
        apples.forEach(apple => {
            const rating = Math.round(Number(apple.rating));
            if (rating >= 1 && rating <= 10) {
                counts[rating]++;
            }
        });

        // Find max value to normalize bar heights
        this.maxCount = Math.max(...counts.slice(1));

        // Generate HTML
        let html = '';
        let totalApples = 0;
        for (let i = 1; i <= 10; i++) {
            const count = counts[i];
            totalApples += count;
            const percentage = this.maxCount > 0 ? (count / this.maxCount) * 100 : 0;

            // Allow bars to be at least a little visible if they have data (e.g. min 1%)
            // but if count is 0, height is 0.
            const height = count > 0 ? Math.max(percentage, 1) : 0;

            html += `
                <div class="test-bar-group">
                    <div class="test-bar-wrapper">
                        <div class="test-bar" style="height: ${height}%;" data-count="${count}" data-rating="${i}" role="button" tabindex="0" aria-label="Filter by rating ${i}">
                            <div class="test-tooltip">${count} Apples</div>
                        </div>
                    </div>
                    <div class="test-bar-label">${i}</div>
                </div>
            `;
        }

        this.graphContainer.innerHTML = html;

        // Update Total Count Label
        const bottomLabel = document.getElementById('graph-label-bottom');
        if (bottomLabel) {
            bottomLabel.innerText = `Total Apples Reviewed: ${totalApples}`;
        }

        // Add Click Listeners
        const bars = this.graphContainer.querySelectorAll('.test-bar');
        bars.forEach(bar => {
            bar.onclick = () => {
                const rating = parseInt(bar.dataset.rating);
                if (this.tableManager && !isNaN(rating)) {
                    this.tableManager.filterByRating(rating);
                    // Smooth scroll to table header
                    const tableHeader = document.querySelector('.table-header-box');
                    if (tableHeader) {
                        tableHeader.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            };

            // Allow keyboard activation
            bar.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    bar.click();
                }
            };
        });
    }
}
