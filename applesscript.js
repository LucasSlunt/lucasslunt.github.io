var AppleCounter = 0;
var imageDirectory = "./ApplePictures/";
var appleImages = ["AuroraGoldenGala","EgremontRusset","Kanzi","Kissabel","LucyGlo","Orin","ScarlettParadise"];
var appleNames = ["Aurora Golden Gala","Egremont Russet","Kanzi","Kissabel","Lucy Glo","Orin","Scarlett Paradise"];
var appleDescriptions = ["Despite the name, it's not a different coloured Gala apple, instead it's a cross between the Gala and Splendour varieties. This is a very sweet apple, and some may have a pinkish-red blush. The apples with bigger blushes and more dots (lenticels) are incredibly sweet. It's one of my favourite apples, and its the apple that got me interested in apples in the first place. 9/10",
                        "Russet apples like this one are apples that are pre-disposed to russeting more than usual apples. The russet texture is like fine sandpaper on the apples skin, and is caused by micro-cracks on its surface. Generally, russet apples like this one have a dry taste, more intense flavour, and are often used to make cider. The russeting on apples is the same as the russeting on Russet potatoes, or Bosc pears. Russeting can occur on regular apples too, just not super intensely.\nThe Egremont russet is quite a dry, crunchy apple, like a firm pear. The skin feels dry and rough because of the russeting, but it doesn't leave a bitter aftertaste. This apple has a very unique flavour from any other apple I've tried. It tastes almost like a pear, though not as much as an Orin apple does. It has a faint underlying flavour of nuts, or cinnamon. It's nice and sweet but barely tart.\nThis apple is awesome, I've been wanting to try a russet apple for a long time, and it has exceeded my expectations. I rate it 9/10, I definitely recommend you try it if you have the chance.",
                        "This apple is very nice, Its a cross between a gala and a braeburn, like the jazz and envy apples. It seems to be more similar to the jazz apple though, its definitely crisp, and has a light, honeycrisp-like flavour. Its fairly sour, but a little less sour than a granny smith. Because of the kanzis large size, it seems to be a bit watery, but thats not too noticeable. 8/10, a great apple for those who prefer them sour.",
                        "Super flavourful, it's sweet, tangy, and has hints of vanilla and sweet berries. The sweet berry flavour is especially prominent in the dark red flesh area between the stem and the core. The texture is right in between crisp and soft.\nKissabel is a trademark name that covers 6 different varieties. The one I had was most likely Kissabel Y101 from IFO fruit. This varieties parents are Golden Delicious and SJ109, an unpatented apple responsible for Kissabels red flesh. Thanks to Lucy for getting these for me.\nThe skin is meant to be yellow, but the pink from the inside bleeds out, making it look orange. It has a conical shape, with pronounced lobes near the base like red delicious. The skin is pretty waxy, almost greasy like Aurora Golden Galas.\nRed flesh apples like this one are amazing, if you ever have the chance to try any, I highly recommend. I rate Kissabel 9/10",
                        "This apple is probably the coolest one I've tried so far.\nIts a cross between a Honeycrisp and a Hidden rose apple, the latter of which is responsible for its red flesh. The Hidden Rose apple is a descendant of the Niedzwetzkyana apple, an awful tasting apple with blood red flesh.\nAs for the taste, Lucy Glo is really good, its quite sweet and tart, and interestingly tastes kind of like wild berries. Highly recommend it, I might be a bit biased because of the cool colour of its flesh, but i give it 10/10.",
                        "Despite being a green-yellow colour, it's not sour at all. Its quite sweet like a golden gala, and while the skin is crisp and thin, the flesh is more soft. What makes this apple interesting is its flavour, it tastes more like a pear than an apple, and it has dense flesh, also like a pear. I thought this apple was very good, much better than a lot of other apples I've tried. If you are a fan of sweet apples, I highly suggest you try this one.\nI bought this apple at a farmers market where one of the workers told me it was a cross between an apple and a pear. Though it may seem true judging from the taste, crossbreeding apples and pears is impossible. The Orin apple is actually a cross between a Golden delicious and an Indo apple.\nI rate this apple 9/10",
                        "Not only is this apple very pretty, it also tastes great. Just the right amount of sour, it's also nicely sweet and juicy. It has a more prevalent flavour than other varieties, reminds me of Aurora Golden Gala, and other dessert apples.\nThe only drawback is that it doesn't have a very long shelf life, lasting about 2 weeks. It's also only available at M&S foods in the UK.\nI emailed the growers for more information about it, though I never got a response.\nI rate it 9/10, great apple."
                    ];
var fileFormat = ".png";
var mainImage;
var mainAppleTitle;
var featuredAppleDescription;
var htmlElementsArray = [];
var numOfApples = appleImages.length;


function setupPage(){
    initializeImages();
    setupButtons();
    initializeTableVariables()
}

function initializeImages(){
    
    htmlElementsArray[0] = document.getElementById('apple1'); 
    htmlElementsArray[1] = document.getElementById('apple2');
    htmlElementsArray[2] = document.getElementById('apple3');

    mainImage = document.getElementById('apple-picture');

    htmlElementsArray[3] = document.getElementById('apple4');
    htmlElementsArray[4] = document.getElementById('apple5');
    htmlElementsArray[5] = document.getElementById('apple6');

    mainAppleTitle = document.getElementById('main-apple-title');
    featuredAppleDescription = document.getElementById('featured-desc');
    
    nextApple();
}

function nextApple(){
    if (AppleCounter < numOfApples-1) AppleCounter++;
    else                                   AppleCounter = 0;
    displayApplePictures();
    changeAppleTitle();
    changeAppleDescription();
}

function prevApple(){
    if (AppleCounter > 0) AppleCounter--;
    else                  AppleCounter = numOfApples-1;
    displayApplePictures();
    changeAppleTitle();
    changeAppleDescription();
}

function changeAppleTitle(){
    mainAppleTitle.innerHTML = appleNames[AppleCounter];
}

function changeAppleDescription(){
    featuredAppleDescription.innerHTML = appleDescriptions[AppleCounter];
}

function displayApplePictures(){
    mainImage.src = imageDirectory+appleImages[AppleCounter]+fileFormat;

    htmlElementsArray[0].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, -3, numOfApples)]+fileFormat;
    htmlElementsArray[1].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, -2, numOfApples)]+fileFormat;
    htmlElementsArray[2].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, -1, numOfApples)]+fileFormat;

    htmlElementsArray[3].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, 1, numOfApples)]+fileFormat;
    htmlElementsArray[4].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, 2, numOfApples)]+fileFormat;
    htmlElementsArray[5].src = imageDirectory+appleImages[validArrayIndex(AppleCounter, 3, numOfApples)]+fileFormat;
}

function validArrayIndex(counter, modifier, maxCounterValue){
    if (counter + modifier >= maxCounterValue){
        return (counter+modifier)-maxCounterValue;
    }
    if (counter+modifier < 0){
        return (counter+modifier)+maxCounterValue;
    }
    return counter+modifier;
}

function setupButtons(){
    document.getElementById("button-next").onclick = nextApple;
    document.getElementById("button-prev").onclick = prevApple;

    document.getElementById("header-name").onclick = sortTable;
    document.getElementById("header-primary-flavour").onclick = sortTableByPrimaryFlavour;
    document.getElementById("header-texture").onclick = sortTableByTexture;
    document.getElementById("header-raw-taste-rating").onclick = sortTableByRating;
    //document.getElementById("header-notable-traits").onclick = sortTableByNotableTraits;
    document.getElementById("header-parents").onclick = sortTableByParents;
    document.getElementById("header-chrono").onclick = sortTableByChrono;

}

//APPLE TABLE STUFF

var table;
var rows;
var tApples = [];
var currentlySortedBy = "";
var sortDir = true;


function initializeTableVariables(){
    table = document.getElementById('apple-table');
    rows = table.rows;

    tApples.push(["Img","Lady Alice","Sweet, candy","Very crisp",8,"Long shelf life","Unknown",1]);
    tApples.push(["Img","Gala","Sweet, tangy","Fairly crisp",5,"Best selling apple in North America","Golden Delicious x Kidds Orange Redd ",2]);
    tApples.push(["Img","Aurora Golden Gala","Very sweet","Crisp",9,"Greasy exterior","Gala x Splendour",3]);
    tApples.push(["Img","Jazz","Slightly sour","Crunchy",6,"Oblong shape","Braeburn x Gala",4]);
    tApples.push(["Img","Envy","Fairly sweet, inconsistent","Very dense, crisp",5,"Browns extremely slowly","Braeburn x Gala",5]);
    tApples.push(["Img","Fuji","Pleasant yet watery","Crisp",5,"Difficult to grow","Ralls Janet x Red Delicious",6]);
    tApples.push(["Img","Pink Lady (Cripps Pink)","Slightly sour","Softer",7,"Very popular in the UK","Golden Delicious x Lady Williams",7]);
    tApples.push(["Img","Spartan","Mildly sweet, vinous","Very soft",5,"Excellent for baking","McIntosh x ?",8]);
    tApples.push(["Img","Opal","Fairly sweet, floral","Crisp",7,"Browns slowly","Golden Delicious x Topaz",9]);
    tApples.push(["Img","Honeycrisp","Sweet, tart","Crunchy",8,"Bruises easily, hard to grow","Keepsake x MN1627",10]);
    tApples.push(["Img","Cosmic Crisp","Sweet, tart","Very crunchy",7,"Intended to replace Honeycrisp","Enterprise x Honeycrisp",11]);
    tApples.push(["Img","Granny Smith","Very Sour, citrusy","Crisp",4,"Excellent for baking","Unknown",12]);
    tApples.push(["Img","Ambrosia","Quite sweet, little flavour","Fairly crisp",5,"Sugar levels are measured with a brix refractometer before harvest","Golden Delicious x Red Delicious",13]);
    tApples.push(["Img","Red Delicious","Bland though fairly sweet","Muddy",2,"Not closely related to \'Golden Delicious\'","Unknown",14]);
    tApples.push(["Img","Rockit","Very sweet, slightly bitter","Crunchy",6,"Barely larger than a golf ball","Gala x Splendour",15]);
    tApples.push(["Img","SugarBee","Very Sweet, similar to Ambrosia","Crisp",6,"Long shelf life","HoneyCrisp x ?",16]);
    tApples.push(["Img","Orin","Sweet, pear","Crisp",9,"Tastes like a pear","Golden Delicious x Indo",17]);
    tApples.push(["Img","Kanzi","Sour, sweet","Crisp",8,"Quite similar to Honeycrisp","Braeburn x Gala",18]);
    tApples.push(["Img","Koru","Bland, sweet","Crisp",4,"Not spicy","Braeburn x Fuji",19]);
    tApples.push(["Img","Jonagold","Faintly sweet, dry","Crisp, coarse",5,"Triploid (3 sets of genes)","Golden Delicious x Jonathan",20]);
    tApples.push(["Img","Smitten","Fairly sweet, watery","Crisp",6,"Has 4 parents","Braeburn x Falstaff x Fiesta x Gala",21]);
    tApples.push(["Img","Unknown","Sour, citrusy","Very crisp",4,"From Place de la Gare park, Quebec city","Unknown",22]);
    tApples.push(["Img","Unknown","Sour, Fuji-like","Crisp",4,"From Place de la Gare park, Quebec city","Unknown",23]);
    tApples.push(["Img","Unknown","Tart, sweet","Softer",6,"From Hazeldell Orchard, Kelowna","Unknown",24]);
    tApples.push(["Img","Silken","Sweet, honey","Crisp",7,"Quite an ugly apple","Honeygold x Sunrise",25]);
    tApples.push(["Img","Nova Spy","Very sour, sweet","Crisp",6,"Trees are very hardy","Golden Delicious x Northern Spy",26]);
    tApples.push(["Img","Lucy Glo","Sweet, wild berries","Crisp",10,"Red fleshed apple","Hidden Rose x HoneyCrisp",27]);
    tApples.push(["Img","Lucy Rose","Sweet, slightly sour","Very crisp",5,"Red fleshed apple","Hidden Rose x Honeycrisp",28]);
    tApples.push(["Img","Pazazz","Sweet, tart","Softer",6,"Long shelf life","Honeycrisp x ?",29]);
    tApples.push(["Img","Lodi","Very sour","very soft, mealy",2,"Good for apple sauce, grows early in the season","Mongomery Sweet x Yellow Transparent",30]);
    tApples.push(["Img","Sunrise","taste","Dense, crunchy",8,"Ripens very early, before Gala","Golden Delicious x McIntosh",31]);
    tApples.push(["Img","Transparent","Bland, sour","Very soft, muddy",1,"Very short shelf life (~10 days)","Unknown",32]);
    tApples.push(["Img","Unknown","Mildly bitter, slightly sour","Softer",3,"The best crabapples in Chapman Camp","Unknown",33]);
    tApples.push(["Img","Earligold","Sour, fairly sweet, concord grape","Very soft",8,"Incredible soft apple","Unknown",34]);
    tApples.push(["Img","Wynoochee Early","Tart, sweet, citrusy","Dense, crisp",6,"Good for cooking and cider","Unknown",35]);
    tApples.push(["Img","Unknown","Sour, bitter","Soft",2,"Found on along a walk in Kimberley","Unknown",36]);
    tApples.push(["Img","Jonaprince","Sour, slightly sweet","Crisp yet light",5,"Trees bear lots of fruit, with a long shelf life","Golden Delicious x Jonathan",37]);
    tApples.push(["Img","Ginger Gold","Sweet, barely tart, dry","Softer",7,"Named 'Ginger' after the farmer who discovered it, not the spice","Golden Delicious x ?",38]);
    tApples.push(["Img","McIntosh","Fairly sweet, slightly sour, vinous","Softer",8,"National apple of Canada","Unknown",39]);
    tApples.push(["Img","Golden Delicious","Sweet, barely sour","Softer",7,"Not closely related to Red Delicious","Grimes Golden x ?",40]);
    tApples.push(["Img","Hidden Rose","Tart, hints of strawberry lemonade","Crisp",7,"Red-fleshed apple","Unknown",41]);
    tApples.push(["Img","Salish","Sweet, tart","Crisp",6,"Named after a group of languages spoken by indigenous people of Canada","Gala x Splendour",42]);
    tApples.push(["Img","September Wonder (Fuji)","Pleasant, watery, slightly tart","Crisp",7,"A sport of Fuji","Fuji",43]);
    tApples.push(["Img","Pinata","Full, sweet, tart","Crisp",7,"Supposedly has a light pineapple aftertaste","Cox's Orange Pippin x Duchess of Oldenburg x Golden Delicious",44]);
    tApples.push(["Img","Unknown Jarred Apples","Cinnamon, spiced","Squishy yet firm, rubber",7,"Crabbapples of unknown variety preserved in a jar","Unknown",45]);
    tApples.push(["Img","Nicola","Sweet, barely tart","Dense, crisp",7,"Develops more flavour as the season progresses","Gala x Splendour",46]);
    tApples.push(["Img","Braeburn","Sweet, sour aftertaste","Softer",7,"A parent of many great apples","Red Delicious x Sturmer Pippin",47]);
    tApples.push(["Img","Alkmene (Red Windsor)","Sour","Very crisp, dense",5,"Given the Award of Garden Merit by Londons Royal Horticultural Society","Cox's Orange Pippin x Geheimrat Dr. Oldenburg",48]);
    tApples.push(["Img","Cox's Orange Pippin (Cox)","Very flavourful, sweet, tart","Crisp, dense",9,"Named after the farmer who grew it, \"Richard Cox\"","Unknown",49]);
    tApples.push(["Img","Bramley","Very sour","Crisp, hard",3,"Excellent for baking, very large","Gravenstein x ?",50]);


    //tApples.push(["Img","name","taste","texture",rating,"note","A x B",51]);



    addRowsToTable(table);
    sortTableByChrono();
}

function addRowsToTable(table){
    
  for (var i = 0; i < tApples.length; i++) {
    const row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(tApples[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}


function printDataToTable(){
    for ( var i = 1; i <= tApples.length; i++){
        rows[i].innerHTML = "<td>"+tApples[i-1][0]+"</td>"+
                            "<td>"+tApples[i-1][1]+"</td>"+
                            "<td>"+tApples[i-1][2]+"</td>"+
                            "<td>"+tApples[i-1][3]+"</td>"+
                            "<td>"+tApples[i-1][4]+"/10</td>"+
                            "<td>"+tApples[i-1][5]+"</td>"+
                            "<td>"+tApples[i-1][6]+"</td>"+
                            "<td>"+tApples[i-1][7]+"</td>";
    }
}

function determineSortDirection(column){
    if (currentlySortedBy == column){sortDir = !sortDir;}
    else {sortDir = true;}
}

function sortTable(){
    determineSortDirection("Name");
    function comparator(a,b){
        if (a[1].toLowerCase().indexOf("unknown") != -1){return 1}
        else if (b[1].toLowerCase().indexOf("unknown") != -1){return -1}
        else if (sortDir) {return a[1].localeCompare(b[1]);}
        else return b[1].localeCompare(a[1]);
    }
    tApples.sort(comparator);
    currentlySortedBy = "Name";
    printDataToTable();
}

    //COMPARATORS
    //negative result -> a comes before b
    //positive result -> b comes before a
    //zero or NaN -> a nd b are equal

function sortTableByRating(){
    determineSortDirection("Rating");
    function comparator(a,b){
        if (sortDir == true){return b[4] - a[4];}
        else return a[4]-b[4];
    }
    tApples.sort(comparator);
    currentlySortedBy = "Rating";
    printDataToTable()
}

function sortTableByParents(){
    determineSortDirection("Parents");
    function comparator(a,b){
        if (a[6].toLowerCase().indexOf("unknown") != -1){return 1}
        else if (b[6].toLowerCase().indexOf("unknown") != -1){return -1}
        if (sortDir) {return a[6].localeCompare(b[6]);}
        return b[6].localeCompare(a[6]);
    }
    tApples.sort(comparator);
    currentlySortedBy = "Parents";
    printDataToTable();
}

function sortTableByChrono(){
    determineSortDirection("Chrono");
    function comparator(a,b){
        if (sortDir == true){return b[7]-a[7];}
        else return a[7]-b[7];
    }
    tApples.sort(comparator);
    currentlySortedBy = "Chrono";
    printDataToTable()
}

function sortTableByPrimaryFlavour(){
    determineSortDirection("PrimaryFlavour");
    function comparator(aRow,bRow){
        a = aRow[2].toLowerCase();
        b = bRow[2].toLowerCase();
        
        
        function determineScoreAsc(taste){
            var score = 0;
            //sorted in order of:
            // very sweet
            // sweet
            // fairly sweet
            // mildly sweet
            // neither sweet nor sour
            // slightly sour 
            // tart
            // sour
            // very sour
            if (taste.indexOf("very sweet") != -1){score = 20}
            else if (taste.indexOf("fairly sweet") != -1){score = 16}
            else if (taste.indexOf("mildly sweet") != -1){score = 14}
            else if (taste.indexOf("sweet") != -1){score = 18}
            else if ((taste.indexOf("sweet") == -1 && taste.indexOf("sour") == -1)){score = 12}
            else if (taste.indexOf("barely sour") != -1){score = 10}
            else if (taste.indexOf("slightly sour") != -1){score = 8}
            else if (taste.indexOf("tart") != -1){score = 6}
            else if (taste.indexOf("very sour") != -1){score = 2}
            else if (taste.indexOf("sour") != -1){score = 4}
            return score;
        }
        function determineScoreDesc(taste){
            var score = 0;
            // sorted in order of 
            // very Sour
            // Sour
            // tart
            //slightly sour
            //neither
            //mildly sweet
            //fairly sweet
            //sweet
            //very sweet
            if (taste.indexOf("very sour") != -1){score = 20}
            else if (taste.indexOf("tart") != -1){score = 16}
            else if (taste.indexOf("slightly sour") != -1){score = 14}
            else if (taste.indexOf("barely sour") != -1){score = 12}
            else if (taste.indexOf("sour") != -1){score = 18}
            else if ((taste.indexOf("sweet") == -1 && taste.indexOf("sour") == -1)){score = 10}
            else if (taste.indexOf("mildly sweet") != -1){score = 8}
            else if (taste.indexOf("fairly sweet") != -1){score = 6}
            else if (taste.indexOf("very sweet") != -1){score = 2}
            else if (taste.indexOf("sweet") != -1){score = 4}
            return score;
        }
        if (sortDir){
            var aScore = determineScoreAsc(a);
            var bScore = determineScoreAsc(b);
        }else{
            var aScore = determineScoreDesc(a);
            var bScore = determineScoreDesc(b);
        }
        
        return bScore-aScore;
    }
    tApples.sort(comparator);
    currentlySortedBy = "PrimaryFlavour";
    printDataToTable()
}

function sortTableByTexture(){
    determineSortDirection("Texture");
    function comparator(aRow,bRow){
        a = aRow[3].toLowerCase();
        b = bRow[3].toLowerCase();
        
        
        function determineScore(texture){
            var score = 0;
            //sorted in order of:
            // very crunchy
            // crunchy
            // very crisp
            // crisp
            // fairly crisp
            // softer 
            // soft
            // very soft
            if (texture.indexOf("very crunchy") != -1){score = 16}
            else if (texture.indexOf("crunchy") != -1){score = 14}
            else if (texture.indexOf("very crisp") != -1){score = 12}
            else if (texture.indexOf("fairly crisp") != -1){score = 8}
            else if (texture.indexOf("crisp") != -1){score = 10}
            else if (texture.indexOf("softer") != -1){score = 6}
            else if (texture.indexOf("very soft") != -1){score = 2}
            else if (texture.indexOf("soft") != -1){score = 4}
            return score;
        }

        var aScore = determineScore(a);
        var bScore = determineScore(b);

        if (sortDir){return bScore-aScore;}
        else return aScore-bScore;
    }
    tApples.sort(comparator);
    currentlySortedBy = "Texture";
    printDataToTable()
}