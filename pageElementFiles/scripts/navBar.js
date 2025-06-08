function colourNavbar(bgColour, itemColour){
    document.getElementById('navbar').style.backgroundColor = bgColour;
    document.getElementById('navbar').style.borderColor = itemColour;

    const navbarItems = document.getElementsByClassName('navbar-item');
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].style.backgroundColor = itemColour;
      }
}
    