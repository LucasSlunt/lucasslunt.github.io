function setupPage(){
    projectTitle();
    initializeImages();
    setupButtons();
}

function projectTitle() {
    document.getElementById('project-date').innerHTML = 'April 2025';
    document.getElementById('project-title').innerHTML = 'Virtual World';
    document.getElementById('project-description').innerHTML = 'A vast open world full of nature and surprises. Made with Unity, Gaia, and Blender';
}

var ImageSetCounter = 0;
var imageDirectory = "./virtual_world_media/";
var images = ["Fields","Mountains","ViewFromMountain","Berries","Berries2","BigBerry","MountainStream","Waterfall","Fog","Anchor","Bridges","CrystalDump"];
var fileFormat = ".png";

function initializeImages(){
    console.debug("initializing images");
    var picture1 = document.getElementById('picture1');
    var picture2 = document.getElementById('picture2');
    var picture3 = document.getElementById('picture3');

    picture1.src = imageDirectory+images[ImageSetCounter*3]+fileFormat;
    picture2.src = imageDirectory+images[ImageSetCounter*3+1]+fileFormat;
    picture3.src = imageDirectory+images[ImageSetCounter*3+2]+fileFormat;
    
}
function nextImages(){
    if (ImageSetCounter < 3) ImageSetCounter++;
    else                     ImageSetCounter = 0;
picture1.src = imageDirectory+images[ImageSetCounter*3]+fileFormat;
picture2.src = imageDirectory+images[ImageSetCounter*3+1]+fileFormat;
picture3.src = imageDirectory+images[ImageSetCounter*3+2]+fileFormat;
}

function prevImages(){
    if (ImageSetCounter > 0) ImageSetCounter--;
    else                     ImageSetCounter = 3;
picture1.src = imageDirectory+images[ImageSetCounter*3]+fileFormat;
picture2.src = imageDirectory+images[ImageSetCounter*3+1]+fileFormat;
picture3.src = imageDirectory+images[ImageSetCounter*3+2]+fileFormat;
}

function setupButtons(){
    document.getElementById("button-next").onclick = nextImages;
    document.getElementById("button-prev").onclick = prevImages;
}
