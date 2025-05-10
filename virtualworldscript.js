function setupPage(){
    loadProjectHeader('April 2025','Virtual World','A vast open world full of nature and surprises. Made with Unity, Gaia, and Blender',"lightblue");
    initializeImages();
    setupButtons();
}

var ImageSetCounter = 3;
var imageDirectory = "./virtual_world_media/";
var images = ["Fields","Mountains","ViewFromMountain","Berries","Berries2","BigBerry","MountainStream","Waterfall","Fog","Anchor","Bridges","CrystalDump"];
var descriptions = [
    "This world has lots to explore. It is 512 x 512 unity units large, about half a square kilometre. The terrain offers imposing peaks, steep cliffs, and rolling meadows, all covered by streams and foliage. It's based on a mountain range in the kootenays, where I grew up."
    ,
    "I created this project around the theme of berry-picking, an activity I really enjoy. Strawberries are abundant in this world, and often appear with a basket nearby. I modelled these in Blender, which was difficult to learn, but my efforts were quite fruitful. "
    ,
    "Small streams trickle down the mountain, culminating in large rivers and powerful waterfalls. Every stream and river was hand-placed, along with rushing river noises, and billowing clouds of fog to give the effect of realistic immersive waterways"
    ,
    "Many structures, ranging from massive stone bridges to tiny baskets, give a sense of direction and story to the world. Large bridges let players cross rivers and rough terrain, while also bringing their origins into question. Mysterious scenes like abandoned cargo and spilt jewels lend a sense of storytelling and wonder to the world"
];
var fileFormat = ".png";

function initializeImages(){
    console.debug("initializing images");
    var picture1 = document.getElementById('picture1');
    var picture2 = document.getElementById('picture2');
    var picture3 = document.getElementById('picture3');
    var pictureDesc = document.getElementById('pictureDesc');

    nextImages();
    
}
function nextImages(){
    if (ImageSetCounter < 3) ImageSetCounter++;
    else                     ImageSetCounter = 0;
picture1.src = imageDirectory+images[ImageSetCounter*3]+fileFormat;
picture2.src = imageDirectory+images[ImageSetCounter*3+1]+fileFormat;
picture3.src = imageDirectory+images[ImageSetCounter*3+2]+fileFormat;
pictureDesc.innerHTML= descriptions[ImageSetCounter];
}

function prevImages(){
    if (ImageSetCounter > 0) ImageSetCounter--;
    else                     ImageSetCounter = 3;
picture1.src = imageDirectory+images[ImageSetCounter*3]+fileFormat;
picture2.src = imageDirectory+images[ImageSetCounter*3+1]+fileFormat;
picture3.src = imageDirectory+images[ImageSetCounter*3+2]+fileFormat;
pictureDesc.innerHTML= descriptions[ImageSetCounter];
}

function setupButtons(){
    document.getElementById("button-next").onclick = nextImages;
    document.getElementById("button-prev").onclick = prevImages;
}
