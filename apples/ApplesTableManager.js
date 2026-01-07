class ApplesTableManager {
    constructor() {
        this.tApples = [];
        this.tDisplay = [];
        this.currentlySortedBy = "";
        this.sortDir = true;
        this.table = null;
        this.userSearchBar = null;
        this.modal = null;
    }

    async initialize() {
        this.table = document.getElementById('apple-table');
        this.userSearchBar = document.getElementById('table-search-bar');
        this.userSearchBar.addEventListener("keyup", () => { this.searchAppleTable(this.userSearchBar.value.toLowerCase()) });

        this.modal = document.getElementById("modal");
        const modalScreen = document.getElementById("modal-screen");
        if (modalScreen) {
            modalScreen.onclick = () => this.closeModal();
        }

        const closeBtn = document.getElementById("modal-close-btn");
        if (closeBtn) {
            closeBtn.onclick = () => this.closeModal();
        }

        await this.initializeData();
        this.tDisplay = [...this.tApples];
        this.addRowsToTable(this.tDisplay);
        this.sortTable((a, b) => this.comparatorChrono(a, b), "Chrono");

        this.setupHeaderListeners();

        // Initialize sort icons (Chrono is default)
        this.updateHeaderIcons("Chrono");

        this.setupDragScroll();
    }

    async initializeData() {
        try {
            const response = await fetch('./apples.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.tApples = data.map(item => new Apple(
                item.id,
                item.name,
                item.taste,
                item.texture,
                item.rating,
                item.notableTraits,
                item.parents,
                item.dateDocumented
            ));
        } catch (error) {
            console.error("Could not load apples data:", error);
            // Fallback or alert user could be added here
        }
    }

    addRowsToTable(apples) {
        this.clearTable();

        apples.forEach(apple => {
            const row = document.createElement("tr");

            // Picture
            const imgCell = document.createElement("td");
            const img = document.createElement("img");
            img.src = apple.imagePath;
            img.width = 80;
            img.height = 80;
            img.id = `apple-id-${apple.id}`;
            img.alt = apple.name;
            img.onclick = () => this.openModal(apple);
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            // Name
            const nameCell = document.createElement("td");
            nameCell.innerText = apple.name;
            row.appendChild(nameCell);

            // Taste
            const tasteCell = document.createElement("td");
            tasteCell.innerText = apple.taste;
            row.appendChild(tasteCell);

            // Texture
            const textureCell = document.createElement("td");
            textureCell.innerText = apple.texture;
            row.appendChild(textureCell);

            // Rating
            const ratingCell = document.createElement("td");
            ratingCell.innerText = `${apple.rating}/10`;
            row.appendChild(ratingCell);

            // Notable Traits
            const traitsCell = document.createElement("td");
            traitsCell.innerText = apple.notableTraits;
            row.appendChild(traitsCell);

            // Parents
            const parentsCell = document.createElement("td");
            parentsCell.innerText = apple.parents;
            row.appendChild(parentsCell);

            // Date Documented
            const dateCell = document.createElement("td");
            dateCell.innerText = apple.dateDocumented;
            row.appendChild(dateCell);

            this.table.appendChild(row);
        });
    }

    clearTable() {
        // Keep the header row (index 0)
        while (this.table.rows.length > 1) {
            this.table.deleteRow(1);
        }
    }

    openModal(apple) {
        if (this.modal) {
            this.modal.setAttribute("aria-hidden", "false");
            this.modal.style.display = ""; // Clear inline style to let CSS take over
            const modalImage = document.getElementById("modal-image");
            modalImage.src = apple.imagePath;
            modalImage.style.cursor = "auto";
            document.getElementById("modal-title").innerHTML = apple.name;
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.setAttribute("aria-hidden", "true");
            this.modal.style.display = ""; // Clear inline style
        }
    }

    setupHeaderListeners() {
        document.getElementById("header-name").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorName(a, b), "Name");
        });

        document.getElementById("header-primary-flavour").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorFlavour(a, b), "PrimaryFlavour");
        });

        document.getElementById("header-texture").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorTexture(a, b), "Texture");
        });

        document.getElementById("header-raw-taste-rating").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorRating(a, b), "Rating");
        });

        document.getElementById("header-parents").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorParents(a, b), "Parents");
        });

        document.getElementById("header-chrono").addEventListener('click', () => {
            this.sortTable((a, b) => this.comparatorChrono(a, b), "Chrono");
        });
    }

    updateHeaderIcons(columnName) {
        // Map column names to element IDs
        const headerMap = {
            "Name": "header-name",
            "PrimaryFlavour": "header-primary-flavour",
            "Texture": "header-texture",
            "Rating": "header-raw-taste-rating",
            "Parents": "header-parents",
            "Chrono": "header-chrono"
        };

        // Clear existing sort classes
        Object.values(headerMap).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove("sort-asc", "sort-desc");
            }
        });

        // Add class to active header
        const activeId = headerMap[columnName];
        if (activeId) {
            const el = document.getElementById(activeId);
            if (el) {

                if (columnName === "Name" || columnName === "Parents") {
                    // true = Asc
                    el.classList.add(this.sortDir ? "sort-asc" : "sort-desc");
                } else {
                    // true = Desc
                    el.classList.add(this.sortDir ? "sort-desc" : "sort-asc");
                }
            }
        }
    }

    determineSortDirection(column) {
        if (this.currentlySortedBy == column) { this.sortDir = !this.sortDir; }
        else { this.sortDir = true; }
    }

    sortTable(comparator, columnName) {
        this.determineSortDirection(columnName);
        this.tDisplay.sort(comparator);
        this.currentlySortedBy = columnName;
        this.addRowsToTable(this.tDisplay);
        this.updateHeaderIcons(columnName);
    }

    // Comparators
    comparatorName(a, b) {
        if (a.name.toLowerCase().indexOf("unknown") != -1) { return 1 }
        else if (b.name.toLowerCase().indexOf("unknown") != -1) { return -1 }
        else if (this.sortDir) { return a.name.localeCompare(b.name); }
        else return b.name.localeCompare(a.name);
    }

    comparatorRating(a, b) {
        if (this.sortDir == true) { return b.rating - a.rating; }
        else return a.rating - b.rating;
    }

    comparatorParents(a, b) {
        if (a.parents.toLowerCase().indexOf("unknown") != -1) { return 1 }
        else if (b.parents.toLowerCase().indexOf("unknown") != -1) { return -1 }
        if (this.sortDir) { return a.parents.localeCompare(b.parents); }
        return b.parents.localeCompare(a.parents);
    }

    comparatorChrono(a, b) {
        if (this.sortDir == true) { return b.id - a.id; }
        else return a.id - b.id;
    }

    comparatorFlavour(a, b) {
        const aTaste = a.taste.toLowerCase();
        const bTaste = b.taste.toLowerCase();

        const determineScoreAsc = (taste) => {
            var score = 0;
            if (taste.indexOf("incredibly sweet") != -1) { score = 22 }
            else if (taste.indexOf("very sweet") != -1) { score = 20 }
            else if (taste.indexOf("fairly sweet") != -1) { score = 16 }
            else if (taste.indexOf("mildly sweet") != -1) { score = 14 }
            else if (taste.indexOf("sweet") != -1) { score = 18 }
            else if ((taste.indexOf("sweet") == -1 && taste.indexOf("sour") == -1)) { score = 12 }
            else if (taste.indexOf("barely sour") != -1) { score = 10 }
            else if (taste.indexOf("slightly sour") != -1) { score = 8 }
            else if (taste.indexOf("tart") != -1) { score = 6 }
            else if (taste.indexOf("very sour") != -1) { score = 2 }
            else if (taste.indexOf("sour") != -1) { score = 4 }
            return score;
        }

        const determineScoreDesc = (taste) => {
            var score = 0;
            if (taste.indexOf("very sour") != -1) { score = 20 }
            else if (taste.indexOf("tart") != -1) { score = 16 }
            else if (taste.indexOf("slightly sour") != -1) { score = 14 }
            else if (taste.indexOf("barely sour") != -1) { score = 12 }
            else if (taste.indexOf("sour") != -1) { score = 18 }
            else if ((taste.indexOf("sweet") == -1 && taste.indexOf("sour") == -1)) { score = 10 }
            else if (taste.indexOf("mildly sweet") != -1) { score = 8 }
            else if (taste.indexOf("fairly sweet") != -1) { score = 6 }
            else if (taste.indexOf("very sweet") != -1) { score = 2 }
            else if (taste.indexOf("incredibly sweet") != -1) { score = 1 }
            else if (taste.indexOf("sweet") != -1) { score = 4 }
            return score;
        }

        let aScore, bScore;
        if (this.sortDir) {
            aScore = determineScoreAsc(aTaste);
            bScore = determineScoreAsc(bTaste);
        } else {
            aScore = determineScoreDesc(aTaste);
            bScore = determineScoreDesc(bTaste);
        }

        return bScore - aScore;
    }

    comparatorTexture(a, b) {
        const aTexture = a.texture.toLowerCase();
        const bTexture = b.texture.toLowerCase();

        const determineScore = (texture) => {
            var score = 0;
            if (texture.indexOf("very crunchy") != -1) { score = 16 }
            else if (texture.indexOf("crunchy") != -1) { score = 14 }
            else if (texture.indexOf("very crisp") != -1) { score = 12 }
            else if (texture.indexOf("fairly crisp") != -1) { score = 8 }
            else if (texture.indexOf("crisp") != -1) { score = 10 }
            else if (texture.indexOf("softer") != -1) { score = 6 }
            else if (texture.indexOf("very soft") != -1) { score = 2 }
            else if (texture.indexOf("soft") != -1) { score = 4 }
            return score;
        }

        var aScore = determineScore(aTexture);
        var bScore = determineScore(bTexture);

        if (this.sortDir) { return bScore - aScore; }
        else return aScore - bScore;
    }

    searchAppleTable(searchTerm) {

        this.tDisplay = this.tApples.filter(apple => {
            // Check all searchable properties
            const searchable = [
                apple.name,
                apple.taste,
                apple.texture,
                apple.rating,
                apple.notableTraits,
                apple.parents,
                apple.dateDocumented
            ];

            return searchable.some(val => val.toString().toLowerCase().indexOf(searchTerm) != -1);
        });

        this.addRowsToTable(this.tDisplay);
    }
    setupDragScroll() {
        const slider = document.querySelector('.table-scroll-wrapper');
        let isDown = false;
        let startX;
        let scrollLeft;

        const checkOverflow = () => {
            if (slider.scrollWidth > slider.clientWidth) {
                slider.classList.add('is-draggable');
            } else {
                slider.classList.remove('is-draggable');
                isDown = false;
                slider.classList.remove('active');
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        slider.addEventListener('mousedown', (e) => {
            if (!slider.classList.contains('is-draggable')) return;
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }
}
