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
}

