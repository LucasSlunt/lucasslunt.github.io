function setupPage(){
    colourNavbar("rgb(245, 215, 135)","bisque");
    setupButtons();
}

function setupButtons(){

    document.getElementById("item-table-button").addEventListener('click', function () {
        toggleTable("item-table","item-table-button");});

    document.getElementById("biome-table-button").addEventListener('click', function () {
        toggleTable("biome-table","biome-table-button");});
}

function toggleTable(tableID,buttonID){
    var table = document.getElementById(tableID);
    var button = document.getElementById(buttonID);
    if (table.style.display == "none") { //if table is hidden
        table.style.display = "block";
        button.innerHTML = "&#8679;";
    }
    else{                                 //if table is visible
        table.style.display = "none";
        button.innerHTML = "&#8681";
    }
}