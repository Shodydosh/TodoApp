
// SIDENAV OPEN&CLOSE

var mySidenav = document.getElementById("mySidenav");

function openNav() {
    // mySidenav.style.display = "block";
    document.getElementById("mySidenav").style.width = "100%";
}


/* Set the width of the mySidenav to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

// OVERLAY ADDING BUTTON

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

