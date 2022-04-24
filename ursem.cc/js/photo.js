/* Copyright 2020 - 2022 Peter Ursem, All Rights Reserved */
//  Peter Ursem's Personal CRM
//  V1.2 - April 22
//  Hello to anyone here!

const colours = ['#cfc7fa', '#e2c6ee', '#efc8dd', '#d7e9db', '#ced9ed'];
var imgSection = document.getElementById("imgs");
var data = {};
var tags = [];
var possibleTags = [];
var hide = true;

//INIT PAGE
function init() {
  fetch('images/database.json')
  .then(r => {
    r.json()
    .then(result => {
      let tagHTML = [];
      let imgHTML = [];

      result.tags.forEach(tag => {
        let tagStr ='"' + tag + '"'; 
        tagHTML.push("<a href='javascript:void(0);' class='tags "+ tag +"' onclick='setTag(" + tagStr + ")'>" + tag + "</a> ");
      });

      result.images.reverse().forEach(img => {
        if (!img.tags.includes("Opa en Opoe")) {
          let thisURL = img.url.replace("images", "thumbs");
          imgHTML.push("<li><img class='img' src='" + thisURL + "' loading='lazy'></li>");
        }
      });

      data = result;
      document.getElementById("tagBar").innerHTML = tagHTML.join(' ');
      imgSection.innerHTML = imgHTML.join(' ');
      
      setModals();
      printImgs([]);
      printMsg("Start");
    });
  });
}
init();

//A TAG IS CLICKED
var opaClicked = false;
function setTag(tag) {
  if (tag === "Opa en Opoe") {
    if(opaClicked === false) {
      let imgHTML = [];
      imgMatches = data.images.reverse().filter(img => {
        if (img.tags.includes("Opa en Opoe")) {
          let thisURL = img.url.replace("images", "thumbs");
          imgHTML.push("<li><img class='img opa' src='" + thisURL + "'></li>");
        }
      });
      imgSection.innerHTML = imgHTML.join(' ');
      setModals();
      opaClicked = true;
    }
    else {
      init();
      opaClicked = false;
      tags = [];
      return;
    }
  }

  let index = tags.indexOf(tag);
  var tagRef = document.getElementsByClassName(tag)[0];

  if (!tags.includes(tag)) {
    let tagColour = colours[Math.floor(Math.random()*colours.length)];
    tagRef.classList.add('selected');
    tagRef.style.setProperty('background-color', tagColour);
    tags.push(tag);
  }
  else {
    tagRef.classList.remove('selected');
    tagRef.style.setProperty('background-color', '#202020');
    tags.splice(index, 1);
  } 

  printImgs(tags);
  printMsg(tag);

  let removeTags = data.tags.filter(tag => !possibleTags.includes(tag));
  removeTags.forEach(tag => {
    let tagButton = document.getElementsByClassName(tag)[0];
    tagButton.style.display = 'none';
  });
  possibleTags.forEach(tag => {
    let tagButton = document.getElementsByClassName(tag)[0];
    if(tagButton) tagButton.style.display = 'inline-block';
  })
}

//APPLY FILTERS
function printImgs(filters) {
  let imgMatches = [];
  possibleTags = [];

  imgMatches = data.images.filter(img => {
    // Check that image matches all filters
    if (img.tags.includes('Hidden')) return !hide;
    let filtered = [];
    filters.forEach(filter => {
      filtered.push(img['tags'].includes(filter));
    });
    let Return = filtered.every(bool => bool === true);
    return Return;
  });

  document.querySelectorAll("#imgs img").forEach(loadedImg => {
    loadedImg.parentElement.style.display = "none";
      let loadedURL = loadedImg.src.replace(loadedImg.baseURI, '');
      imgMatches.forEach(img => {
      img.tags.forEach(tag => {
        if(!possibleTags.includes(tag)) possibleTags.push(tag);
      });
      if(img.url === loadedURL) loadedImg.parentElement.style.display = "block";
    });
  });
}

function printMsg(tag) {
  let msgRef = document.getElementById("message");
  let msgData = data.messages[tag];
  if(msgData) {
    msgRef.innerHTML = msgData;
    msgRef.style.display = 'block';
  }
  else {
    msgRef.innerHTML = "";
    msgRef.style.display = 'none';
  }
}


//MODAL OVERLAY
function setModals(){
  var modal = document.getElementById("imgModal");
  var imgs = document.getElementsByClassName("img");
  var modalImg = document.getElementById("modalImg");

  for(var img of imgs)            
  {
    var orientation = ""
    if(img.naturalWidth > img.naturalHeight) orientation = "Horizontal";
    else orientation = "Vertical";
    img.classList.add(orientation);
    img.onclick = function(){
      modal.style.display = "block";
      let fullURL = this.src.replace("thumbs", "images");
      modalImg.src = fullURL;
    }
  }

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() { 
    modal.style.display = "none";
  }
}