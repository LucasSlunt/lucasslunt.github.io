var AppleCounter;
var imageDirectory = "./ApplePictures/";
var appleImages = ["AuroraGoldenGala","EgremontRusset","Kanzi","Kissabel","LucyGlo","Orin","ScarlettParadise"];
var fileFormat = ".png";
var mainImage;
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
    
}

function nextApple(){
    if (AppleCounter < numOfApples-1) AppleCounter++;
    else                                   AppleCounter = 0;
    mainImage.src = imageDirectory+appleImages[AppleCounter]+fileFormat;

    htmlElementsArray[0].src = imageDirectory+appleImages[AppleCounter-3]+fileFormat;
    htmlElementsArray[1].src = imageDirectory+appleImages[AppleCounter-2]+fileFormat;
    htmlElementsArray[2].src = imageDirectory+appleImages[AppleCounter-1]+fileFormat;

    htmlElementsArray[3].src = imageDirectory+appleImages[AppleCounter+1]+fileFormat;
    htmlElementsArray[4].src = imageDirectory+appleImages[AppleCounter+2]+fileFormat;
    htmlElementsArray[5].src = imageDirectory+appleImages[AppleCounter+3]+fileFormat;
}

function prevApple(){
    if (AppleCounter > 0) AppleCounter--;
    else                  AppleCounter = numOfApples-1;
    mainImage.src = imageDirectory+appleImages[AppleCounter]+fileFormat;
}

function setupButtons(){
    document.getElementById("button-next").onclick = nextApple;
    document.getElementById("button-prev").onclick = prevApple;
}

