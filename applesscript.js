var AppleCounter = 0;
var imageDirectory = "./ApplePictures/";
var appleImages = ["AuroraGoldenGala","EgremontRusset","Kanzi","Kissabel","LucyGlo","Orin","ScarlettParadise"];
var fileFormat = ".png";
var appleImage;

function setupPage(){
    initializeImages();
    setupButtons();
}

function initializeImages(){
    appleImage = document.getElementById('apple-picture');

    nextApple();
    
}

function nextApple(){
    if (AppleCounter < appleImages.length-1) AppleCounter++;
    else                                   AppleCounter = 0;
    appleImage.src = imageDirectory+appleImages[AppleCounter]+fileFormat;
}

function prevApple(){
    if (AppleCounter > 0) AppleCounter--;
    else                  AppleCounter = appleImages.length-1;
    appleImage.src = imageDirectory+appleImages[AppleCounter]+fileFormat;
}

function setupButtons(){
    document.getElementById("button-next").onclick = nextApple;
    document.getElementById("button-prev").onclick = prevApple;
}

