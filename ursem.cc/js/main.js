//Burger Menu
function menuButton() {
    var x = document.getElementById("burgermenu");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
        x.style.width = "100%";
    }
 }

//Cursor
document.addEventListener('mousedown', function(){document.body.style.cursor = 'grabbing';});
document.addEventListener('mouseup', function(){document.body.style.cursor = 'grab'});