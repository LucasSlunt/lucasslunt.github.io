var AppleCounter = 0;
var imageDirectory = "./ApplePictures/";
var appleImages = ["AllApples/3","AllApples/51","AllApples/18","Kissabel","LucyGlo","AllApples/17","AllApples/60"];
var appleNames = ["Aurora Golden Gala","Egremont Russet","Kanzi","Kissabel","Lucy Glo","Orin","Scarlett Paradise"];
var appleDescriptions = ["Despite the name, it's not a different coloured Gala apple, instead it's a cross between the Gala and Splendour varieties. This is a very sweet apple, and some may have a pinkish-red blush. The apples with bigger blushes and more dots (lenticels) are incredibly sweet. It's one of my favourite apples, and its the apple that got me interested in apples in the first place.",
                        "Russet apples like this one are apples that are pre-disposed to russeting more than usual apples. The russet texture is like fine sandpaper on the apples skin, and is caused by micro-cracks on its surface. Generally, russet apples like this one have a dry taste, more intense flavour, and are often used to make cider. The russeting on apples is the same as the russeting on Russet potatoes, or Bosc pears. Russeting can occur on regular apples too, just not super intensely.\nThe Egremont russet is quite a dry, crunchy apple, like a firm pear. The skin feels dry and rough because of the russeting, but it doesn't leave a bitter aftertaste. This apple has a very unique flavour from any other apple I've tried. It tastes almost like a pear, though not as much as an Orin apple does. It has a faint underlying flavour of nuts, or cinnamon. It's nice and sweet but barely tart.\nThis apple is awesome, I've been wanting to try a russet apple for a long time, and it has exceeded my expectations. I definitely recommend you try it if you have the chance.",
                        "This apple is very nice, Its a cross between a gala and a braeburn, like the jazz and envy apples. It seems to be more similar to the jazz apple though, its definitely crisp, and has a light, honeycrisp-like flavour. Its fairly sour, but a little less sour than a granny smith. Because of the kanzis large size, it seems to be a bit watery, but thats not too noticeable. A great apple for those who prefer them sour.",
                        "Super flavourful, it's sweet, tangy, and has hints of vanilla and sweet berries. The sweet berry flavour is especially prominent in the dark red flesh area between the stem and the core. The texture is right in between crisp and soft.\nKissabel is a trademark name that covers 6 different varieties. The one I had was most likely Kissabel Y101 from IFO fruit. This varieties parents are Golden Delicious and SJ109, an unpatented apple responsible for Kissabels red flesh. Thanks to Lucy for getting these for me.\nThe skin is meant to be yellow, but the pink from the inside bleeds out, making it look orange. It has a conical shape, with pronounced lobes near the base like red delicious. The skin is pretty waxy, almost greasy like Aurora Golden Galas.\nRed flesh apples like this one are amazing, if you ever have the chance to try any, I highly recommend. I rate Kissabel 9/10",
                        "This apple is probably the coolest one I've tried so far.\nIts a cross between a Honeycrisp and a Hidden rose apple, the latter of which is responsible for its red flesh. The Hidden Rose apple is a descendant of the Niedzwetzkyana apple, an awful tasting apple with blood red flesh.\nAs for the taste, Lucy Glo is really good, its quite sweet and tart, and interestingly tastes kind of like wild berries. Highly recommend it, I might be a bit biased because of the cool colour of its flesh.",
                        "Despite being a green-yellow colour, it's not sour at all. Its quite sweet like a golden gala, and while the skin is crisp and thin, the flesh is more soft. What makes this apple interesting is its flavour, it tastes more like a pear than an apple, and it has dense flesh, also like a pear. I thought this apple was very good, much better than a lot of other apples I've tried. If you are a fan of sweet apples, I highly suggest you try this one.\nI bought this apple at a farmers market where one of the workers told me it was a cross between an apple and a pear. Though it may seem true judging from the taste, crossbreeding apples and pears is impossible. The Orin apple is actually a cross between a Golden delicious and an Indo apple.",
                        "Not only is this apple very pretty, it also tastes great. Just the right amount of sour, it's also nicely sweet and juicy. It has a more prevalent flavour than other varieties, reminds me of Aurora Golden Gala, and other dessert apples.\nThe only drawback is that it doesn't have a very long shelf life, lasting about 2 weeks. It's also only available at M&S foods in the UK.\nI emailed the growers for more information about it, though I never got a response."
                    ];
var fileFormat = ".jpg";
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

    document.getElementById("modal-screen").onclick = closeModal;

}

//APPLE TABLE STUFF

var table;
var rows;
var tApples = [];
var tDisplay = []; //the data to be displayed
var currentlySortedBy = "";
var sortDir = true;

var userSearchBar;
var userSearchValue;

function initializeTableVariables(){
    table = document.getElementById('apple-table');
    rows = table.rows;

    userSearchBar = document.getElementById('table-search-bar');
    userSearchBar.addEventListener("keyup", ()=>{searchAppleTable(userSearchBar.value.toLowerCase())});
    

    tApples.push(["Img","Lady Alice","Sweet, candy","Very crisp",8,"Long shelf life","Unknown","Jan 23, 2022",1]);
    tApples.push(["Img","Gala","Sweet, tangy","Fairly crisp",5,"Best selling apple in North America","Golden Delicious x Kidds Orange Redd ","January 24, 2022",2]);
    tApples.push(["Img","Aurora Golden Gala","Very sweet","Crisp",9,"The skin feels slightly greasy","Gala x Splendour","January 25, 2022",3]);
    tApples.push(["Img","Jazz","Slightly sour","Crunchy",6,"Oblong shape","Braeburn x Gala","January 25, 2022",4]);
    tApples.push(["Img","Envy","Fairly sweet, inconsistent","Very dense, crisp",5,"Browns extremely slowly","Braeburn x Gala","January 26, 2022",5]);
    tApples.push(["Img","Fuji","Pleasant yet watery","Crisp",5,"Difficult to grow","Ralls Janet x Red Delicious","January 26, 2022",6]);
    tApples.push(["Img","Pink Lady (Cripps Pink)","Slightly sour","Softer",7,"Very popular in the UK","Golden Delicious x Lady Williams","February 2, 2022",7]);
    tApples.push(["Img","Spartan","Mildly sweet, vinous","Very soft",5,"Excellent for baking","McIntosh x ?","February 3, 2022",8]);
    tApples.push(["Img","Opal","Fairly sweet, floral","Crisp",7,"Browns slowly","Golden Delicious x Topaz","February 9, 2022",9]);
    tApples.push(["Img","Honeycrisp","Sweet, tart","Crunchy",8,"Bruises easily, hard to grow","Keepsake x MN1627","February 10, 2022",10]);
    tApples.push(["Img","Cosmic Crisp","Sweet, tart","Very crunchy",7,"Intended to replace Honeycrisp","Enterprise x Honeycrisp","February 11, 2022",11]);
    tApples.push(["Img","Granny Smith","Very Sour, citrusy","Crisp",4,"Excellent for baking","Unknown","February 14, 2022",12]);
    tApples.push(["Img","Ambrosia","Quite sweet, little flavour","Fairly crisp",5,"Sugar levels are measured with a brix refractometer before harvest","Golden Delicious x Red Delicious","February 16, 2022",13]);
    tApples.push(["Img","Red Delicious","Bland though fairly sweet","Muddy",2,"Not closely related to \'Golden Delicious\'","Unknown","February 22, 2022",14]);
    tApples.push(["Img","Rockit","Very sweet, slightly bitter","Crunchy",6,"Barely larger than a golf ball","Gala x Splendour","March 22, 2022",15]);
    tApples.push(["Img","SugarBee","Very Sweet, similar to Ambrosia","Crisp",6,"Long shelf life","HoneyCrisp x ?","March 22, 2022",16]);
    tApples.push(["Img","Orin","Sweet, pear","Crisp",9,"Tastes like a pear","Golden Delicious x Indo","March 24, 2022",17]);
    tApples.push(["Img","Kanzi","Sour, sweet","Crisp",8,"Quite similar to Honeycrisp","Braeburn x Gala","March 24, 2022",18]);
    tApples.push(["Img","Koru","Bland, sweet","Crisp",4,"Supposedly has a mild spicy flavour","Braeburn x Fuji","April 16, 2022",19]);
    tApples.push(["Img","Jonagold","Faintly sweet, dry","Crisp, coarse",5,"Triploid (3 sets of genes)","Golden Delicious x Jonathan","July 28, 2022",20]);
    tApples.push(["Img","Smitten","Fairly sweet, watery","Crisp",6,"Has 4 parents","Braeburn x Falstaff x Fiesta x Gala","August 2, 2022",21]);
    tApples.push(["Img","Unknown","Sour, citrusy","Very crisp",4,"From Place de la Gare park, Quebec city","Unknown","August 30, 2022",22]);
    tApples.push(["Img","Unknown","Sour, Fuji-like","Crisp",4,"From Place de la Gare park, Quebec city","Unknown","August 30, 2022",23]);
    tApples.push(["Img","Unknown","Tart, sweet","Softer",6,"From Hazeldell Orchard, Kelowna","Unknown","September 24, 2022",24]);
    tApples.push(["Img","Silken","Sweet, honey","Crisp",7,"Quite an ugly apple","Honeygold x Sunrise","September 24, 2022",25]);
    tApples.push(["Img","Nova Spy","Very sour, sweet","Crisp",6,"Trees are very hardy","Golden Delicious x Northern Spy","October 14, 2022",26]);
    tApples.push(["Img","Lucy Glo","Sweet, wild berries","Crisp",10,"Red fleshed apple","Hidden Rose x HoneyCrisp","November 27, 2022",27]);
    tApples.push(["Img","Lucy Rose","Sweet, slightly sour","Very crisp",5,"Red fleshed apple","Hidden Rose x Honeycrisp","December 29, 2022",28]);
    tApples.push(["Img","Pazazz","Sweet, tart","Softer",6,"Long shelf life","Honeycrisp x ?","July 9, 2023",29]);
    tApples.push(["Img","Lodi","Very sour","Very soft, mealy",2,"Good for apple sauce, grows early in the season","Mongomery Sweet x Yellow Transparent","July 28, 2023",30]);
    tApples.push(["Img","Sunrise","Sweet, sharp, juicy","Dense, crunchy",8,"Ripens very early, before Gala","Golden Delicious x McIntosh","August 3, 2023",31]);
    tApples.push(["Img","Transparent","Bland, sour","Very soft, muddy",1,"Very short shelf life (~10 days)","Unknown","August 4, 2023",32]);
    tApples.push(["Img","Unknown","Mildly bitter, slightly sour","Softer",3,"The best crabapples in Chapman Camp","Unknown","August 14, 2023",33]);
    tApples.push(["Img","Earligold","Sour, fairly sweet, concord grape","Very soft",8,"Incredible soft apple","Unknown","August 15, 2023",34]);
    tApples.push(["Img","Wynoochee Early","Tart, sweet, citrusy","Dense, crisp",6,"Good for cooking and cider","Unknown","August 18, 2023",35]);
    tApples.push(["Img","Unknown","Sour, bitter","Soft",2,"Found on along a walk in Kimberley","Unknown","August 27, 2023",36]);
    tApples.push(["Img","Jonaprince","Sour, slightly sweet","Crisp yet light",5,"Trees bear lots of fruit, with a long shelf life","Golden Delicious x Jonathan","September 17, 2023",37]);
    tApples.push(["Img","Ginger Gold","Sweet, barely tart, dry","Softer",7,"Named 'Ginger' after the farmer who discovered it, not the spice","Golden Delicious x ?","October 4, 2023",38]);
    tApples.push(["Img","McIntosh","Fairly sweet, slightly sour, vinous","Softer",8,"National apple of Canada","Unknown","October 13, 2023",39]);
    tApples.push(["Img","Golden Delicious","Sweet, barely sour","Softer",7,"Not closely related to Red Delicious","Grimes Golden x ?","October 18, 2023",40]);
    tApples.push(["Img","Hidden Rose","Tart, hints of strawberry lemonade","Crisp",7,"Red-fleshed apple","Unknown","November 9, 2023",41]);
    tApples.push(["Img","Salish","Sweet, tart","Crisp",6,"Named after a group of languages spoken by indigenous people of Canada","Gala x Splendour","November 11, 2023",42]);
    tApples.push(["Img","September Wonder (Fuji)","Pleasant, watery, slightly tart","Crisp",7,"A sport of Fuji","Fuji","November 12, 2023",43]);
    tApples.push(["Img","Pinata","Full, sweet, tart","Crisp",7,"Supposedly has a light pineapple aftertaste","Cox's Orange Pippin x Duchess of Oldenburg x Golden Delicious","November 15, 2023",44]);
    tApples.push(["Img","Unknown Jarred Apples","Cinnamon, spiced","Squishy yet firm, rubber",7,"Crabbapples of unknown variety preserved in a jar","Unknown","January 5, 2024",45]);
    tApples.push(["Img","Nicola","Sweet, barely tart","Dense, crisp",7,"Develops more flavour as the season progresses","Gala x Splendour","January 25, 2024",46]);
    tApples.push(["Img","Braeburn","Sweet, sour aftertaste","Softer",7,"A parent of many great apples","Red Delicious x Sturmer Pippin","February 25, 2024",47]);
    tApples.push(["Img","Alkmene (Red Windsor)","Sour","Very crisp, dense",5,"Given the Award of Garden Merit by Londons Royal Horticultural Society","Cox's Orange Pippin x Geheimrat Dr. Oldenburg","September 12, 2024",48]);
    tApples.push(["Img","Cox's Orange Pippin (Cox)","Very flavourful, sweet, tart","Crisp, dense",9,"Named after the farmer who grew it, \'Richard Cox\'","Unknown","September 23, 2024",49]);
    tApples.push(["Img","Bramley","Very sour","Crisp, hard",3,"Excellent for baking, very large","Gravenstein x ?","September 24, 2024",50]);
    tApples.push(["Img","Egremont Russet","Dry, pear-like, nutty, cinnamon, sweet","Crunchy",10,"Traditionally made into cider. The skin is rough like a russet potato","Unknown","September 25, 2024",51]);
    tApples.push(["Img","Pirouette","Sweet, a bit tart","Crisp",6,"Popular with organic growers","Clivia x Rubin","September 26, 2024",52]);
    tApples.push(["Img","Zari","Sweet, tangy","Crisp",5,"Fairly new variety, from belgium","Delbard Estivale x Elstar","October 2, 2024",53]);
    tApples.push(["Img","Santana","Sour, vinous","Crisp",6,"Specially developed to minimize the amount of a specific protein that some people are allergic to","Elstar x Priscilla","October 6, 2024",54]);
    tApples.push(["Img","Rubens (Civni)","Quite sweet, barely sour","Crisp, flakey like an asian pear",7,"All growers of the Rubens variety are required to use minimal pesticides.","Gala x Elstar","October 16, 2024",55]);
    tApples.push(["Img","Unknown","Fairly sweet, crabappley","Softer",7,"May have been related to Bramley, though it was much sweeter.","Unknown","October 19, 2024",56]);
    tApples.push(["Img","Maribelle","Mild","Firm",4,"Has a very large yield of apples","Elstar x Gloster x Meiprinses","October 22, 2024",57]);
    tApples.push(["Img","Reinette","Mild","Muddy",2,"\'Reinette\' is an umbrella term for ~50 different apples. It is unknown which specific reinette this apple is","Unknown","November 1, 2024",58]);
    tApples.push(["Img","Samboa","Incredibly sweet, dry","Very crisp",5,"\'Samboa\' is a brand name that cover 3 very similar apples, which only differ in their harvest times","Imperatriz x Pink Lady or Imperatriz x Baronesa","November 2, 2024",59]);
    tApples.push(["Img","Scarlett Paradise","Sweet, sour, similar to Aurora Golden Gala","Crisp",9,"Only available at select retailers in the UK","Unknown","November 3, 2024",60]);
    tApples.push(["Img","Pixie","Fairly sweet, sharp tang","Crisp",6,"Very small, barely larger than a mandarin orange","Unknown","November 4, 2024",61]);
    tApples.push(["Img","Delgoton","Mild, little flavour","Soft",3,"This variety may have been created through Delbard Orchards irradiating technique of \'regenesis\'","Unknown","November 5, 2024",62]);
    tApples.push(["Img","Red Dream","Sweet, very similar to Honeycrisp","Crisp",7,"Almost no information about this apple is online","Unknown","November 6, 2024",63]);
    tApples.push(["Img","Chantecler (Belchard)","Sweet, refreshingly sour","Soft, fine-grained",6,"Tastes similar to Golden delicious","Golden Delicious x Reinette Clochard","November 7, 2024",64]);
    tApples.push(["Img","Rubinette (Rafzubin)","Very sweet, sharp honey flavour","Crisp",7,"Quite small, difficult to grow","Cox's Orange Pippen x Golden Delicious","November 8, 2024",65]);
    tApples.push(["Img","Amber","Fairly sweet, soft, watery","Softer",5,"Not to be confused with \"Apple Amber\" an Irish dessert similar to an apple custard pie","Unknown","November 10, 2024",66]);
    tApples.push(["Img","Kissabel (Y101)","Sweet, tangy, vanilla, sweet berries","Between crisp and soft",9,"Kissabel is a trademark name for 6 similar apple varieties","Golden Delicious x SJ109","November 13, 2024",67]);
    tApples.push(["Img","CrimsonCrisp","Very sweet, sour","Very crisp, dense",8,"Can stay in storage for several months","PCF2-134 x PRI 669-205","November 15, 2024",68]);
    tApples.push(["Img","Magic Star (Sprank, Kentish Kiss)","Very sweet, slightly sour","Very crisp",6,"When grown organically, this apple is marketed under the name \'Natrya\'","Elise x ?","November 16, 2024",69]);
    tApples.push(["Img","Robijn","Mild, fairly sweet","Fairly soft",4,"This variety is a mutation of a mutation of Jonagold","Jonagold Delcosta","November 17, 2024",70]);
    tApples.push(["Img","Cheerfull Gold","Full, sweet, balanced sour taste","Crisp",8,"Apples hang onto the tree into winter","Cox's Orange Pippen x Golden Delicious","November 28, 2024",71]);
    tApples.push(["Img","Cameo","Fairly mild, just okay","Dense, crisp",4,"Its colour varies dramatically between apples","Golden Delicious x Red Delicious","November 28, 2024",72]);
    tApples.push(["Img","Lolipop (Inored)","Incredibly sweet, candy, dry","Very crisp",7,"Can stay in storage for up to 8 months","Pinova x X6398","December 21, 2024",73]);
    tApples.push(["Img","Red Prince (Red Jonaprince)","Mild","Soft",3,"Taste improves with age","Golden Delicious x Jonathan","December 23, 2024",74]);
    tApples.push(["Img","Golden Rose","Sour, fairly sweet","Crisp",6,"Very little information available online","Unknown","December 26, 2024",75]);
    tApples.push(["Img","Rave","Tart, sweet, ridiculously juicy","Very crisp",9,"One of the juiciest apples I have ever tried","Honeycrisp x MonArk","December 28, 2024",76]);
    tApples.push(["Img","Gravenstein","Complex, sweet, tart, toffee","Soft, mealy",6,"Popular heritage apple over 350 years old","Unknown","December 29, 2024",77]);
    tApples.push(["Img","Paula Red","Sweet, sour, floral, strawberry","Crisp, becomes soft later in the season",4,"The farmer who discovered it named it after his wife, Pauline","Duchess x McIntosh","December 30, 2024",78]);
    tApples.push(["Img","Empire","Sweet, vinous","Soft",6,"Has very thick skin","McIntosh x Red Delicious","December 31, 2024",79]);
    tApples.push(["Img","SweetTango (Minneiska)","Sweet, tangy, light","Very crunchy",7,"Long shelf life, though flavour degrades quickly with time","Honeycrisp x Zelstar!","January 1, 2025",80]);    
    tApples.push(["Img","Bliss","Sweet, slightly tart","Soft",4,"Little information available online.","Unknown","January 2, 2025",81]);
    tApples.push(["Img","Autumn Glory","Sweet, cinnamon, caramel","Very crisp",9,"Excellent for applesauce, or savoury dishes","Golden Delicious x Fuji","March 6, 2025",82]);



    //tApples.push(["Img","name","taste","texture",rating,"note","A x B",81]);
    addimagesToArray(tApples);

    tDisplay = tApples;
    addRowsToTable(table,tDisplay);
    sortTableByChrono();
}

var tableImages = [];

function addimagesToArray(arrayToAddImagesTo){
    for (var i = 0; i < arrayToAddImagesTo.length; i++){
        tableImages[i] = new Image(80,80);
        tableImages[i].src = "./ApplePictures/AllApples/"+(i+1)+".jpg"
        tableImages[i].id = "apple-id-"+(i+1);
        tableImages[i].alt = tApples[i][1];
        arrayToAddImagesTo[i][0] = tableImages[i].outerHTML;
    }
    
}

function attachModalFunctions(){
    for (let i = 0; i < tApples.length; i++){
        imageID = "apple-id-"+(i+1);
        image = document.getElementById(imageID);
        //console.debug(i);
        if(image){
        image.onclick = function() {
                    console.debug("Clicked image number " + i);
                    modal.style.display = "block";
                    document.getElementById("modal-image").src = "./ApplePictures/AllApples/"+(i+1)+".jpg"
                    document.getElementById("modal-title").innerHTML = document.getElementById("apple-id-"+(i+1)).alt;
                }
            }
    }
}

function closeModal(){
    var modal =document.getElementById("modal");
    modal.style.display = "none";
}


function addRowsToTable(table,arrayToBeAdded){
    
  for (var i = 0; i < arrayToBeAdded.length; i++) {
    const row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      if (j == 0){// add images as images, not as plaintext
        cell.innerHTML = arrayToBeAdded[i][j];
      }else{
      var cellText = document.createTextNode(arrayToBeAdded[i][j]);
      cell.appendChild(cellText);
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function deleteAllRowsFromTable(){
    for (var i = tDisplay.length; i > 0; i--){
        table.deleteRow(i);
    }
    
}

function printDataToTable(){
    for ( var i = 1; i <=tDisplay.length; i++){
        rows[i].innerHTML = "<td>"+tDisplay[i-1][0]+"</td>"+ //picture
                            "<td>"+tDisplay[i-1][1]+"</td>"+ //name
                            "<td>"+tDisplay[i-1][2]+"</td>"+ //taste
                            "<td>"+tDisplay[i-1][3]+"</td>"+ //texture
                            "<td>"+tDisplay[i-1][4]+"/10</td>"+ //rating
                            "<td>"+tDisplay[i-1][5]+"</td>"+ //notable traits
                            "<td>"+tDisplay[i-1][6]+"</td>"+ //parents
                            "<td>"+tDisplay[i-1][7]+"</td>"; //date documented
    }
    attachModalFunctions(); //please refactor this later, this is terrible
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
    tDisplay.sort(comparator);
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
    tDisplay.sort(comparator);
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
    tDisplay.sort(comparator);
    currentlySortedBy = "Parents";
    printDataToTable();
}

function sortTableByChrono(){
    determineSortDirection("Chrono");
    function comparator(a,b){
        if (sortDir == true){return b[8]-a[8];}
        else return a[8]-b[8];
    }
    tDisplay.sort(comparator);
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
            if (taste.indexOf("incredibly sweet") != -1){score = 22}
            else if (taste.indexOf("very sweet") != -1){score = 20}
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
            else if (taste.indexOf("incredibly sweet") != -1){score = 1}
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
    tDisplay.sort(comparator);
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
    tDisplay.sort(comparator);
    currentlySortedBy = "Texture";
    printDataToTable()
}

function searchAppleTable(searchTerm){
    var hasRowAtIndexBeenAddedToTable= new Array(tApples.length).fill(0);
    var rowsContainingSearchTerm  =[];
    for (var j = 1; j < 8; j++){ //j goes from 1-7 because there are 8 columns, and the 0th column is images (unsearchable)
        for (var i = 0; i < tApples.length; i++){
            if (hasRowAtIndexBeenAddedToTable[i] == 0 && tApples[i][j].toString().toLowerCase().indexOf(searchTerm) != -1){
                rowsContainingSearchTerm.push(tApples[i]);
                hasRowAtIndexBeenAddedToTable[i] = 1;
            }
        }
    }
    deleteAllRowsFromTable()
    tDisplay = rowsContainingSearchTerm;
    addRowsToTable(table,tDisplay);
    printDataToTable();

}

