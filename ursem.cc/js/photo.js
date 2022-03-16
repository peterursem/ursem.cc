//  Peter Ursem's Personal CRM
//  V0.1 - March 2022
//  Hello to anyone here!

function printPage(tags) {
  var db;
  var photosHTML;

    //Load Image DB
    fetch('http://127.0.0.1:5500/photos/DB.json')
    .then(response => response.json().then(data => db = data));

    const filters = ["Me", "Colour"];

    document.getElementById("photos").innerHTML = photosHTML;
}

//MODAL OVERLAY

var modal = document.getElementById("imgModal");
var imgs = document.getElementsByClassName("img")
var modalImg = document.getElementById("modalImg");

for(var img of imgs)
{
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    }
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
  modal.style.display = "none";
}