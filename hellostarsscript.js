var isBadgeAnimated = true;

function setupPage(){
    colourNavbar("rgb(196, 28, 140)","rgb(223, 62, 132)");
    loadProjectHeader('March 2025','Hello, Stars!','First-place winner of UBCOs GIT Hackathon. Made with Java, MySQL, Springboot, Python, JavaScript, HTML, and CSS',"rgb(223, 62, 132)");
    setBadgeLevel("silver");
    animateBadge();
}

function animateBadge(){
    var randomNum = Math.floor(Math.random()*3);
    setBadgeLevel(randomNum);
        var intervalId = null;
        var timer = 0;
        clearInterval(intervalId);

        intervalId = setInterval(frame, 5);
        function frame() {
          if (timer == 400) {
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