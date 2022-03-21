//  Peter Ursem's Personal CRM
//  V0.1 - March 2022
//  Hello to anyone here!

fetch('images/DB.json')
.then(r => {
  r.json()
  .then(result => {
    let tagHTML = [];
    result.tags.forEach(tag => {let tagStr ='"' + tag + '"'; tagHTML.push("<a href='javascript:void(0);' class='tags "+ tag +"' onclick='setTag(" + tagStr + ")'>" + tag + "</a> ");});
    document.getElementById("tagBar").innerHTML = tagHTML.join(' ');
    printPage([]);
  });
});

var tags = [];
function setTag(tag) {
  var colours = ['#cfc7fa', '#e2c6ee', '#efc8dd', '#d7e9db', '#ced9ed'];

  index = tags.indexOf(tag);
  var tagRef = document.getElementsByClassName(tag)[0];
  if (index === -1) {
    let tagColour = colours[Math.floor(Math.random()*colours.length)];
    tagRef.classList.add('selected');
    tagRef.style.setProperty('background-color', tagColour);
    console.log(tags);
    tags.push(tag);
  }
  else {
    tagRef.classList.remove('selected');
    tagRef.style.setProperty('background-color', '#202020');
    console.log(tagRef);
    tags.splice(index, 1);
  } 
  printPage(tags);
}

function printPage(filters) {
  var imgSection = document.getElementById("imgs");
  var imgMatches = [];
  var imgHTML = [];
  fetch('images/database.json')
  .then(response => {
    response.json().then(result => {
      imgMatches = result.images.filter(img => {
        // Check that image matches all filters
        let filtered = [];
        filters.forEach(filter => {
        filtered.push(img['tags'].includes(filter.toLowerCase()));
        });
        let Return = filtered.every(bool => bool === true);
        return Return;
      });

      imgMatches.forEach(img => {
          imgHTML.push("<img class='img' src='" + img.url + "'>");
      });
      imgSection.innerHTML = imgHTML.join(' ');
      setModals();
    });
  });
}

//MODAL OVERLAY

function setModals(){
  var modal = document.getElementById("imgModal");
  var imgs = document.getElementsByClassName("img");
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
}