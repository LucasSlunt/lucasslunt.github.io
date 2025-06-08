var numOfBadgeImages = 5;

function setBadgeLevel(level){
    var colours = setupBadgeColours(level);
    colourLines(colours);

    var innerBadgeImage = document.getElementById("inner-badge-image");
    setBadgeImage(innerBadgeImage);
}

function animateBadge(){
    var randomNum = Math.floor(Math.random()*3);
    setBadgeLevel(randomNum);
        var intervalId = null;
        var timer = 0;
        clearInterval(intervalId);

        intervalId = setInterval(frame, 5);
        function frame() {
          if (timer == 300) {
            timer = 0;
            clearInterval(intervalId);
            intervalId = setInterval(frame, 5);

            var randomNum = Math.floor(Math.random()*3);
            setBadgeLevel(randomNum);

          } else {
            timer++;
          }
        }

}

function setupBadgeColours(level){
    var col1 = "#000000";
    var col2 = "#000000";
    var col3 = "#000000";

    if (level == 0){//bronze
        col1 = "#3f3a39";
        col2 = "#dddce3";
        col3 = "#9194ac";
    }else if (level == 1){//silver
        col1 = "#501c07";
        col2 = "#cc852d";
        col3 = "#774a20";
    }else if (level == 2){//gold
        col1 = "#b5640b";
        col3 = "#f7bd02";
        col2 = "#fff038";
    }
    var colours = [col1,col2,col3];
    return colours
}

function colourLines(colours){
    var badgeItems1 = document.getElementsByClassName("badge-colour-1");
    for (var i = 0; i < badgeItems1.length; i++) {
        badgeItems1[i].style.fill = colours[0];
    }

    var badgeItems2 = document.getElementsByClassName("badge-colour-2");
    for (var i = 0; i < badgeItems2.length; i++) {
        badgeItems2[i].style.fill = colours[1];
    }

    var badgeItems3 = document.getElementsByClassName("badge-colour-3");
    for (var i = 0; i < badgeItems3.length; i++) {
        badgeItems3[i].style.fill = colours[2];
    }
}

function setBadgeImage(img){
    var imageTitle = "";
    var randomImageSelector = Math.floor(Math.random()*numOfBadgeImages);
    switch (randomImageSelector){
        case 0:
            imageTitle = "centaurus";
            break;
        case 1:
            imageTitle = "crux";
            break;
        case 2:
            imageTitle = "leo";
            break;
        case 3:
            imageTitle = "musca";
            break;
        case 4:
        default:
            imageTitle = "ursa-minor";
            break;    
    }
    img.src = "./hello_stars_media/"+imageTitle+".png";
}