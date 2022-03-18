//  Peter Ursem's Personal CRM
//  V0.1 - March 2022
//  Hello to anyone here!

async function printPage(type, filters) {
    //Load Image DB
    fetch('/ursem.cc/images/DB.json')
    .then(response => {
      var imgMatches = [];

      response.json().then(result => {
        imgMatches = result.images.filter(img => {
          let filtered = [];
          console.log(img);
          filters.forEach(filter => {
            filtered.push(img[type].includes(filter));
            console.log(filter);
          });
          console.log(filtered);
          let Return = filtered.every(bool => bool === true);
          return Return;
        });
        
        var imgSection = document.getElementById("imgs");
        var imgHTML = [];
        console.log(imgMatches);
        imgMatches.forEach(img => {
            imgHTML.push("<img src='" + img.url + "'>");
            console.log(imgHTML);
        });
        imgSection.innerHTML = imgHTML.join(' ');
      });
    })
}

//MODAL OVERLAY

var modal = document.getElementById("imgModal");
var imgSpace = document.getElementsByClassName("img")
var modalImg = document.getElementById("modalImg");

function setModals(){
  for(var img of imgs)m            
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
}