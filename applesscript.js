var AppleCounter;
var imageDirectory = "./ApplePictures/";
var appleImages = ["AuroraGoldenGala","EgremontRusset","Kanzi","Kissabel","LucyGlo","Orin","ScarlettParadise"];
var appleNames = ["Aurora Golden Gala","Egremont Russet","Kanzi","Kissabel","Lucy Glo","Orin","Scarlett Paradise"];
var fileFormat = ".png";
var mainImage;
var mainAppleTitle;
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
    
    nextApple();
}

function nextApple(){
    if (AppleCounter < numOfApples-1) AppleCounter++;
    else                                   AppleCounter = 0;
    displayApplePictures();
    changeAppleDescription();
}

function prevApple(){
    if (AppleCounter > 0) AppleCounter--;
    else                  AppleCounter = numOfApples-1;
    displayApplePictures();
}

function changeAppleDescription(){
    mainAppleTitle.innerHTML = appleNames[AppleCounter];
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

