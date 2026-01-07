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

    initialize() {
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

        this.initializeData();
        this.tDisplay = [...this.tApples];
        this.addRowsToTable(this.tDisplay);
        this.sortTable((a, b) => this.comparatorChrono(a, b), "Chrono");

        this.setupHeaderListeners();

        // Initialize sort icons (Chrono is default)
        this.updateHeaderIcons("Chrono");

        this.setupDragScroll();
    }

    initializeData() {
        const rawData = [
            ["Img", "Lady Alice", "Sweet, candy", "Very crisp", 8, "Long shelf life", "Unknown", "January 23, 2022", 1],
            ["Img", "Gala", "Sweet, tangy", "Fairly crisp", 5, "Best selling apple in North America", "Golden Delicious x Kidds Orange Redd ", "January 24, 2022", 2],
            ["Img", "Aurora Golden Gala", "Very sweet", "Crisp", 9, "The skin feels slightly greasy", "Gala x Splendour", "January 25, 2022", 3],
            ["Img", "Jazz", "Slightly sour", "Crunchy", 6, "Oblong shape", "Braeburn x Gala", "January 25, 2022", 4],
            ["Img", "Envy", "Fairly sweet, inconsistent", "Very dense, crisp", 5, "Browns extremely slowly", "Braeburn x Gala", "January 26, 2022", 5],
            ["Img", "Fuji", "Pleasant yet watery", "Crisp", 5, "Difficult to grow", "Ralls Janet x Red Delicious", "January 26, 2022", 6],
            ["Img", "Pink Lady (Cripps Pink)", "Slightly sour", "Softer", 7, "Very popular in the UK", "Golden Delicious x Lady Williams", "February 2, 2022", 7],
            ["Img", "Spartan", "Mildly sweet, vinous", "Very soft", 5, "Excellent for baking", "McIntosh x ?", "February 3, 2022", 8],
            ["Img", "Opal", "Fairly sweet, floral", "Crisp", 7, "Browns slowly", "Golden Delicious x Topaz", "February 9, 2022", 9],
            ["Img", "Honeycrisp", "Sweet, tart", "Crunchy", 8, "Bruises easily, hard to grow", "Keepsake x MN1627", "February 10, 2022", 10],
            ["Img", "Cosmic Crisp", "Sweet, tart", "Very crunchy", 7, "Intended to replace Honeycrisp", "Enterprise x Honeycrisp", "February 11, 2022", 11],
            ["Img", "Granny Smith", "Very Sour, citrusy", "Crisp", 4, "Excellent for baking", "Unknown", "February 14, 2022", 12],
            ["Img", "Ambrosia", "Quite sweet, little flavour", "Fairly crisp", 5, "Sugar levels are measured with a brix refractometer before harvest", "Golden Delicious x Red Delicious", "February 16, 2022", 13],
            ["Img", "Red Delicious", "Bland though fairly sweet", "Muddy", 2, "Not closely related to 'Golden Delicious'", "Unknown", "February 22, 2022", 14],
            ["Img", "Rockit", "Very sweet, slightly bitter", "Crunchy", 6, "Barely larger than a golf ball", "Gala x Splendour", "March 22, 2022", 15],
            ["Img", "SugarBee", "Very Sweet, similar to Ambrosia", "Crisp", 6, "Long shelf life", "HoneyCrisp x ?", "March 22, 2022", 16],
            ["Img", "Orin", "Sweet, pear", "Crisp", 9, "Tastes like a pear", "Golden Delicious x Indo", "March 24, 2022", 17],
            ["Img", "Kanzi", "Sour, sweet", "Crisp", 8, "Quite similar to Honeycrisp", "Braeburn x Gala", "March 24, 2022", 18],
            ["Img", "Koru", "Bland, sweet", "Crisp", 4, "Supposedly has a mild spicy flavour", "Braeburn x Fuji", "April 16, 2022", 19],
            ["Img", "Jonagold", "Faintly sweet, dry", "Crisp, coarse", 5, "Triploid (3 sets of genes)", "Golden Delicious x Jonathan", "July 28, 2022", 20],
            ["Img", "Smitten", "Fairly sweet, watery", "Crisp", 6, "Has 4 parents", "Braeburn x Falstaff x Fiesta x Gala", "August 2, 2022", 21],
            ["Img", "Unknown", "Sour, citrusy", "Very crisp", 4, "From Place de la Gare park, Quebec city", "Unknown", "August 30, 2022", 22],
            ["Img", "Unknown", "Sour, Fuji-like", "Crisp", 4, "From Place de la Gare park, Quebec city", "Unknown", "August 30, 2022", 23],
            ["Img", "Unknown", "Tart, sweet", "Softer", 6, "From Hazeldell Orchard, Kelowna", "Unknown", "September 24, 2022", 24],
            ["Img", "Silken", "Sweet, honey", "Crisp", 7, "Quite an ugly apple", "Honeygold x Sunrise", "September 24, 2022", 25],
            ["Img", "Nova Spy", "Very sour, sweet", "Crisp", 6, "Trees are very hardy", "Golden Delicious x Northern Spy", "October 14, 2022", 26],
            ["Img", "Lucy Glo", "Sweet, wild berries", "Crisp", 10, "Red fleshed apple", "Hidden Rose x HoneyCrisp", "November 27, 2022", 27],
            ["Img", "Lucy Rose", "Sweet, slightly sour", "Very crisp", 5, "Red fleshed apple", "Hidden Rose x Honeycrisp", "December 29, 2022", 28],
            ["Img", "Pazazz", "Sweet, tart", "Softer", 6, "Long shelf life", "Honeycrisp x ?", "July 9, 2023", 29],
            ["Img", "Lodi", "Very sour", "Very soft, mealy", 2, "Good for apple sauce, grows early in the season", "Mongomery Sweet x Yellow Transparent", "July 28, 2023", 30],
            ["Img", "Sunrise", "Sweet, sharp, juicy", "Dense, crunchy", 8, "Ripens very early, before Gala", "Golden Delicious x McIntosh", "August 3, 2023", 31],
            ["Img", "Transparent", "Bland, sour", "Very soft, muddy", 1, "Very short shelf life (~10 days)", "Unknown", "August 4, 2023", 32],
            ["Img", "Unknown", "Mildly bitter, slightly sour", "Softer", 3, "The best crabapples in Chapman Camp", "Unknown", "August 14, 2023", 33],
            ["Img", "Earligold", "Sour, fairly sweet, concord grape", "Very soft", 8, "Incredible soft apple", "Unknown", "August 15, 2023", 34],
            ["Img", "Wynoochee Early", "Tart, sweet, citrusy", "Dense, crisp", 6, "Good for cooking and cider", "Unknown", "August 18, 2023", 35],
            ["Img", "Unknown", "Sour, bitter", "Soft", 2, "Found on along a walk in Kimberley", "Unknown", "August 27, 2023", 36],
            ["Img", "Jonaprince", "Sour, slightly sweet", "Crisp yet light", 5, "Trees bear lots of fruit, with a long shelf life", "Golden Delicious x Jonathan", "September 17, 2023", 37],
            ["Img", "Ginger Gold", "Sweet, barely tart, dry", "Softer", 7, "Named 'Ginger' after the farmer who discovered it, not the spice", "Golden Delicious x ?", "October 4, 2023", 38],
            ["Img", "McIntosh", "Fairly sweet, slightly sour, vinous", "Softer", 8, "National apple of Canada", "Unknown", "October 13, 2023", 39],
            ["Img", "Golden Delicious", "Sweet, barely sour", "Softer", 7, "Not closely related to Red Delicious", "Grimes Golden x ?", "October 18, 2023", 40],
            ["Img", "Hidden Rose", "Tart, hints of strawberry lemonade", "Crisp", 7, "Red fleshed apple", "Unknown", "November 9, 2023", 41],
            ["Img", "Salish", "Sweet, tart", "Crisp", 6, "Named after a group of languages spoken by indigenous people of Canada", "Gala x Splendour", "November 11, 2023", 42],
            ["Img", "September Wonder (Fuji)", "Pleasant, watery, slightly tart", "Crisp", 7, "A sport of Fuji", "Fuji", "November 12, 2023", 43],
            ["Img", "Pinata", "Full, sweet, tart", "Crisp", 7, "Supposedly has a light pineapple aftertaste", "Cox's Orange Pippin x Duchess of Oldenburg x Golden Delicious", "November 15, 2023", 44],
            ["Img", "Unknown Jarred Apples", "Cinnamon, spiced", "Squishy yet firm, rubber", 7, "Crabbapples of unknown variety preserved in a jar", "Unknown", "January 5, 2024", 45],
            ["Img", "Nicola", "Sweet, barely tart", "Dense, crisp", 7, "Develops more flavour as the season progresses", "Gala x Splendour", "January 25, 2024", 46],
            ["Img", "Braeburn", "Sweet, sour aftertaste", "Softer", 7, "A parent of many great apples", "Red Delicious x Sturmer Pippin", "February 25, 2024", 47],
            ["Img", "Alkmene (Red Windsor)", "Sour", "Very crisp, dense", 5, "Given the Award of Garden Merit by Londons Royal Horticultural Society", "Cox's Orange Pippin x Geheimrat Dr. Oldenburg", "September 12, 2024", 48],
            ["Img", "Cox's Orange Pippin (Cox)", "Very flavourful, sweet, tart", "Crisp, dense", 9, "Named after the farmer who grew it, 'Richard Cox'", "Unknown", "September 23, 2024", 49],
            ["Img", "Bramley", "Very sour", "Crisp, hard", 3, "Excellent for baking, very large", "Gravenstein x ?", "September 24, 2024", 50],
            ["Img", "Egremont Russet", "Dry, pear-like, nutty, cinnamon, sweet", "Crunchy", 10, "Traditionally made into cider. The skin is rough like a russet potato", "Unknown", "September 25, 2024", 51],
            ["Img", "Pirouette", "Sweet, a bit tart", "Crisp", 6, "Popular with organic growers", "Clivia x Rubin", "September 26, 2024", 52],
            ["Img", "Zari", "Sweet, tangy", "Crisp", 5, "Fairly new variety, from belgium", "Delbard Estivale x Elstar", "October 2, 2024", 53],
            ["Img", "Santana", "Sour, vinous", "Crisp", 6, "Specially developed to minimize the amount of a specific protein that some people are allergic to", "Elstar x Priscilla", "October 6, 2024", 54],
            ["Img", "Rubens (Civni)", "Quite sweet, barely sour", "Crisp, flakey like an asian pear", 7, "All growers of the Rubens variety are required to use minimal pesticides.", "Gala x Elstar", "October 16, 2024", 55],
            ["Img", "Unknown", "Fairly sweet, crabappley", "Softer", 7, "May have been related to Bramley, though it was much sweeter.", "Unknown", "October 19, 2024", 56],
            ["Img", "Maribelle", "Mild", "Firm", 4, "Has a very large yield of apples", "Elstar x Gloster x Meiprinses", "October 22, 2024", 57],
            ["Img", "Reinette", "Mild", "Muddy", 2, "'Reinette' is an umbrella term for ~50 different apples. It is unknown which specific reinette this apple is", "Unknown", "November 1, 2024", 58],
            ["Img", "Samboa", "Incredibly sweet, dry", "Very crisp", 5, "'Samboa' is a brand name that cover 3 very similar apples, which only differ in their harvest times", "Imperatriz x Pink Lady or Imperatriz x Baronesa", "November 2, 2024", 59],
            ["Img", "Scarlett Paradise", "Sweet, sour, similar to Aurora Golden Gala", "Crisp", 9, "Only available at select retailers in the UK", "Unknown", "November 3, 2024", 60],
            ["Img", "Pixie", "Fairly sweet, sharp tang", "Crisp", 6, "Very small, barely larger than a mandarin orange", "Unknown", "November 4, 2024", 61],
            ["Img", "Delgoton", "Mild, little flavour", "Soft", 3, "This variety may have been created through Delbard Orchards irradiating technique of 'regenesis'", "Unknown", "November 5, 2024", 62],
            ["Img", "Red Dream", "Sweet, very similar to Honeycrisp", "Crisp", 7, "Almost no information about this apple is online", "Unknown", "November 6, 2024", 63],
            ["Img", "Chantecler (Belchard)", "Sweet, refreshingly sour", "Soft, fine-grained", 6, "Tastes similar to Golden delicious", "Golden Delicious x Reinette Clochard", "November 7, 2024", 64],
            ["Img", "Rubinette (Rafzubin)", "Very sweet, sharp honey flavour", "Crisp", 7, "Once in a job interview, I was asked why I rated this apple so low. (I got the job)", "Cox's Orange Pippen x Golden Delicious", "November 8, 2024", 65],
            ["Img", "Amber", "Fairly sweet, soft, watery", "Softer", 5, "Not to be confused with \"Apple Amber\" an Irish dessert similar to an apple custard pie", "Unknown", "November 10, 2024", 66],
            ["Img", "Kissabel (Y101)", "Sweet, tangy, vanilla, sweet berries", "Between crisp and soft", 9, "Kissabel is a trademark name for 6 similar apple varieties", "Golden Delicious x SJ109", "November 13, 2024", 67],
            ["Img", "CrimsonCrisp", "Very sweet, sour", "Very crisp, dense", 8, "Can stay in storage for several months", "PCF2-134 x PRI 669-205", "November 15, 2024", 68],
            ["Img", "Magic Star (Sprank, Kentish Kiss)", "Very sweet, slightly sour", "Very crisp", 6, "When grown organically, this apple is marketed under the name 'Natrya'", "Elise x ?", "November 16, 2024", 69],
            ["Img", "Robijn", "Mild, fairly sweet", "Fairly soft", 4, "This variety is a mutation of a mutation of Jonagold", "Jonagold Delcosta", "November 17, 2024", 70],
            ["Img", "Cheerfull Gold", "Full, sweet, balanced sour taste", "Crisp", 8, "Apples hang onto the tree into winter", "Cox's Orange Pippen x Golden Delicious", "November 28, 2024", 71],
            ["Img", "Cameo", "Fairly mild, just okay", "Dense, crisp", 4, "Its colour varies dramatically between apples", "Golden Delicious x Red Delicious", "November 28, 2024", 72],
            ["Img", "Lolipop (Inored)", "Incredibly sweet, candy, dry", "Very crisp", 7, "Can stay in storage for up to 8 months", "Pinova x X6398", "December 21, 2024", 73],
            ["Img", "Red Prince (Red Jonaprince)", "Mild", "Soft", 3, "Taste improves with age", "Golden Delicious x Jonathan", "December 23, 2024", 74],
            ["Img", "Golden Rose", "Sour, fairly sweet", "Crisp", 6, "Very little information available online", "Unknown", "December 26, 2024", 75],
            ["Img", "Rave", "Tart, sweet, ridiculously juicy", "Very crisp", 9, "One of the juiciest apples I have ever tried", "Honeycrisp x MonArk", "December 28, 2024", 76],
            ["Img", "Gravenstein", "Complex, sweet, tart, toffee", "Soft, mealy", 6, "Popular heritage apple over 350 years old", "Unknown", "December 29, 2024", 77],
            ["Img", "Paula Red", "Sweet, sour, floral, strawberry", "Crisp, becomes soft later in the season", 4, "The farmer who discovered it named it after his wife, Pauline", "Duchess x McIntosh", "December 30, 2024", 78],
            ["Img", "Empire", "Sweet, vinous", "Soft", 6, "Has very thick skin", "McIntosh x Red Delicious", "December 31, 2024", 79],
            ["Img", "SweetTango (Minneiska)", "Sweet, tangy, light", "Very crunchy", 7, "Long shelf life, though flavour degrades quickly with time", "Honeycrisp x Zelstar!", "January 1, 2025", 80],
            ["Img", "Bliss", "Sweet, slightly tart", "Soft", 4, "Little information available online.", "Unknown", "January 2, 2025", 81],
            ["Img", "Autumn Glory", "Sweet, cinnamon, caramel", "Very crisp", 9, "Excellent for applesauce, or savoury dishes", "Golden Delicious x Fuji", "March 6, 2025", 82],
            ["Img", "Mutsu (Crispin)", "Very sour", "Crisp", 3, "Changes colour based on the amount of sunlight it is exposed to", "Indo x Golden Delicious", "September 13, 2025", 83],
            ["Img", "Snow Cloud", "Tart, Sweet", "Hard, crisp", 4, "A popular ornamental crabapple, the size of a dime", "Crimson Cloud x Strawberry Parfait", "November 5, 2025", 84],
            ["Img", "Elstar", "Sweet, honeyed", "Softer", 7, "Very popular in Europe", "Golden Delicious x Ingrid Marie", "November 6 2025", 85],
            ["Img", "Winter Banana", "Mildly sweet, faint notes of banana and topical fruit", "Softer", 7, "Smells like a banana when ripe", "Unknown", "November 7 2025", 86],
            ["Img", "Easter Orange", "Sweet, intense", "Dry, dense, crisp", 6, "Very orange skin", "Unknown", "November 8 2025", 87],
            ["Img", "Golden Russet", "Subtly sweet, tart, molasses, caramel, spice", "Very dense, tough", 7, "Very strong flavour, generally used for cider", "Unknown", "November 9 2025", 88],
            ["Img", "Lady (Api)", "sweet, bright, citrus, floral", "Fairly crisp", 7, "A 400 year old variety, historically used in Christmas wreaths and garlands", "Unknown", "November 10 2025", 89],
            ["Img", "Winesap", "tangy, sweet, vinous", "softer", 6, "Often used for cider", "Unknown", "November 11 2025", 90],
            ["Img", "Sekai Ichi (World #1)", "Very sweet, light", "Very crisp", 6, "Sekai Ichi means World's Number One in Japanese", "Golden Delicous x Red Delicious", "November 12 2025", 91],
            ["Img", "Discovery", "Mildly sweet", "Soft, smooth, almost buttery", 7, "Generally used for applesauce, and exceedingly fit to do so", "Beauty of Bath x Worcester Pearmain", "November 13 2025", 92],
            ["Img", "Crawley Beauty", "Light, slightly sour", "softer", 5, "Blindingly white flesh", "Unknown", "November 14 2025", 93],
            ["Img", "Chinook", "Refreshingly tart, balanced", "Firm, crisp", 5, "Created in Summerland B.C. alongside the Silken and Creston varieties", "Gala x Splendour", "November 15 2025", 94],
            ["Img", "Johnathan", "Light, slightly sour", "Soft", 4, "Used to be very popular but has been overtaken by modern varieties", "Esopus Spitzenburg x Unknown", "November 16 2025", 95],
            ["Img", "Court Royal", "Sweet, complex", "Soft", 5, "Not to be confused with Royal Court, a sport of Cortland", "Unknown", "November 17 2025", 96],
            ["Img", "Snow Apple (Famuese)", "Barely tart, delicately vinous", "Soft", 3, "This heirloom variety used to be very popular in Quebec", "Unknown", "November 18 2025", 97],
            ["Img", "Dazzle", "Juicy, sweet", "Very crisp, like a watermelon", 7, "Very popular in Asia", "Scired x Sweetie", "November 19 2025", 98],
            ["Img", "Gloster 69", "Mildy sweet, barely tart", "Crisp, a bit mealy", 4, "Released in 1969 (hence the name)", "Glockenapfel x Richared Delicious", "November 20 2025", 99],
            ["Img", "Evercrisp", "Ridiculously sweet, tart", "Very crunchy, like splitting wood", 8, "A very overpowering and intense apple", "Fuji x Honeycrisp", "November 21 2025", 100],
            ["Img", "Red Rome", "Sweet, subtle candy flavour", "Soft, mealy", 3, "Excellent for baking", "Rome", "December 9 2025", 101],
            ["Img", "Arkansas Black", "Tart, vinous", "Dense, crisp", 6, "Exceeding dark skin, and keeps well", "Winesap x ?", "December 26 2025", 102],
            ["Img", "Scarlet Spur", "More sweet than sour, floral", "Crisp", 7, "Seems like a much better version of Red Delicious", "Red Delicious", "December 27 2025", 103],
            ["Img", "Melrose", "Sweet, refreshingly acidic. Notes of citrus", "Softer", 7, "Official state apple of Ohio", "Johnathan x Red Delicious", "December 30 2025", 104]
        ];

        this.tApples = rawData.map(data => new Apple(
            data[8], // id
            data[1], // name
            data[2], // taste
            data[3], // texture
            data[4], // rating
            data[5], // notableTraits
            data[6], // parents
            data[7]  // dateDocumented
        ));
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
