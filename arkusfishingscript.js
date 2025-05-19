function setupPage(){
    loadProjectHeader('August 2023','Arkus\'s Fishing','An exciting expansion of Minecrafts fishing mechanics. Made with the Minecraft Forge API, Java, and GIMP.','bisque');
    colourNavbar("rgb(245, 215, 135)","bisque");
    setupButtons();
}

function setupButtons(){

    document.getElementById("item-table-button").addEventListener('click', function () {
        toggleTable("item-table");});
}

function toggleTable(tableID){
    console.debug("toggle table called, " + document.getElementById(tableID).style.display);
    if (document.getElementById(tableID).style.display == "none") {
        document.getElementById(tableID).style.display = "block";
    }
    else{
        document.getElementById(tableID).style.display = "none";
    }
}