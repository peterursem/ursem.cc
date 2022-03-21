//  Peter Ursem's Personal CRM
//  V0.1 - March 2022
//  Hello to anyone here!

const colours = ['#cfc7fa', '#e2c6ee', '#efc8dd', '#d7e9db', '#ced9ed'];
var imgSection = document.getElementById("imgs");
var data = {};
var tags = [];
var possibleTags = [];

fetch('images/database.json')
.then(r => {
  r.json()
  .then(result => {
    let tagHTML = [];
    result.tags.forEach(tag => {let tagStr ='"' + tag + '"'; tagHTML.push("<a href='javascript:void(0);' class='tags "+ tag +"' onclick='setTag(" + tagStr + ")'>" + tag + "</a> ");});
    document.getElementById("tagBar").innerHTML = tagHTML.join(' ');
    data = result;
    printPage([]);
  });
});

function setTag(tag) {
  let index = tags.indexOf(tag);
  var tagRef = document.getElementsByClassName(tag)[0];

  if (index === -1) {
    let tagColour = colours[Math.floor(Math.random()*colours.length)];
    tagRef.classList.add('selected');
    tagRef.style.setProperty('background-color', tagColour);
    tags.push(tag);
  }
  else {
    tagRef.classList.remove('selected');
    tagRef.style.setProperty('background-color', '#202020');
    console.log(tagRef);
    tags.splice(index, 1);
  } 
  possibleTags =[];
  printPage(tags);

  let removeTags = data.tags.filter(tag => !possibleTags.includes(tag));
  removeTags.forEach(tag => {
    console.log('Removing Tag: ' + tag);
    let tagButton = document.getElementsByClassName(tag)[0];
    tagButton.style.display = 'none';
  });
  possibleTags.forEach(tag => {
    let tagButton = document.getElementsByClassName(tag)[0];
    tagButton.style.display = 'inline-block'
  })
}

function printPage(filters, printHidden) {
  let imgMatches = [];
  let imgHTML = [];

  imgMatches = data.images.filter(img => {
    // Check that image matches all filters
    if (img.tags.includes('Hidden')) return printHidden;
    let filtered = [];
    filters.forEach(filter => {
      filtered.push(img['tags'].includes(filter));
    });
    let Return = filtered.every(bool => bool === true);
    return Return;
  });

  imgMatches.forEach(img => {
      img.tags.forEach(tag => {
        if(!possibleTags.includes(tag)) possibleTags.push(tag);
      })
      imgHTML.push("<img class='img' src='" + img.url + "'>");
  });
  imgSection.innerHTML = imgHTML.join(' ');
  setModals();
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