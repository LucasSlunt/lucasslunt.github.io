var numOfBadgeImages = 5;

function setBadgeLevel(level){
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

    var badgeItems1 = document.getElementsByClassName("badge-colour-1");
    for (var i = 0; i < badgeItems1.length; i++) {
        badgeItems1[i].style.fill = col1;
    }

    var badgeItems2 = document.getElementsByClassName("badge-colour-2");
    for (var i = 0; i < badgeItems2.length; i++) {
        badgeItems2[i].style.fill = col2;
    }

    var badgeItems3 = document.getElementsByClassName("badge-colour-3");
    for (var i = 0; i < badgeItems3.length; i++) {
        badgeItems3[i].style.fill = col3;
    }

    var innerBadgeImage = document.getElementById("inner-badge-image");
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
    innerBadgeImage.src = "./hello_stars_media/"+imageTitle+".png";
}