/* Copyright 2020 - 2022 Peter Ursem, All Rights Reserved */
//  Peter Ursem's Crack CRM
//  V2 - August '22
//  Hello to anyone here!

const loadChunkSize = 5;
const selectionColours = ['#cfc7fa', '#e2c6ee', '#efc8dd', '#d7e9db', '#ced9ed'];
const hide = true;

var imgSection = document.getElementById('imgs');
var database = {};
fetch('images/database.json')
.then(result => {
    result.json()
    .then(data => {
        data.images.reverse()
        database = data;
        init();
    });
});

function init(){
    document.getElementById('slogan').innerText = database.slogan;
    //Print All Tags
    let tagBar = document.getElementById('tagBar');
    database.tags.forEach(tag => {
        let tagElem = document.createElement('a');
            tagElem.textContent = tag;
            tagElem.id = tag;
            tagElem.className = 'tags';
            tagElem.href = 'javascript:void(0)';
            tagElem.addEventListener('click', function(){setTag(tag);});
            tagBar.appendChild(tagElem);
            loadedImgs++;
    });
    setTag("");
    printMsg("Index");
}

var tags = [];
var imgMatches = [];
function setTag(tag){
    let index = tags.indexOf(tag);
    let tagRef = document.getElementById(tag);
    loadedImgs = 0;

    //Draw Tag Buttons
    if(tag){
        if(tags.includes(tag)){
            tagRef.classList.remove('selected');
            tagRef.style.setProperty('background-color', '#202020')
            tags.splice(index, 1)
        }
        else {
            let tagColour = selectionColours[Math.floor(Math.random()*selectionColours.length)];
            tagRef.classList.add('selected');
            tagRef.style.setProperty('background-color', tagColour);
            tags.push(tag);
        }
    }

    let possibleTags = [];
    //Find Applicable Images
    imgMatches = database.images.filter(img => {
        if(img.tags.includes('Hidden')) return !hide;
        let results = [];
        tags.forEach(tag => results.push(img.tags.includes(tag)));
        return results.every(result => result === true);
    });
    if(tags.length === 0) {
        imgMatches = database.images.filter(img => {
        if(img.tags.includes('Hidden')) return !hide;
        if(img.tags.includes('Opa en Opoe') || img.url.includes("/riding20/")) return false;
        return true;
        });
        possibleTags.push("Opa en Opoe");
    }
    //Show Related Tags
    imgMatches.forEach(img => {
        img.tags.forEach(tag => {
            if(!possibleTags.includes(tag) && tag != 'Index' && tag != 'Hidden') possibleTags.push(tag);
        });
    });
    let removeTags = database.tags.filter(tag => {
        if(tag == 'Index') return false;
        if(tag == 'Hidden') return !hide;
        else return !possibleTags.includes(tag);
    });
    removeTags.forEach(tag => document.getElementById(tag).style.display = 'none');
    possibleTags.forEach(tag => document.getElementById(tag).style.display = 'inline-block');

    printMsg(tag);
    printImgs(imgMatches, true);
}

var loadedImgs = 0;
function printImgs(printQueue, reset){
    let newImages = [];
    for(let i=loadedImgs; i < loadedImgs + loadChunkSize && i < printQueue.length; i++){
        let imgLi = document.createElement("li");
        let imgElem = document.createElement("img");
            imgElem.src = printQueue[i].url;
            imgElem.className = "img";
        imgLi.appendChild(imgElem);
        imgSection.appendChild(imgLi);
        if(reset == true) newImages.push(imgLi);
        else imgSection.appendChild(imgLi);
        gtag('event', 'image_loaded', {
            'url': printQueue[i].url,
            'loadedImgs': i
        });
    }
    loadedImgs = loadedImgs + loadChunkSize;
    gtag('event', 'page_loaded', {
        'page_number': loadedImgs/loadChunkSize
    });
    if(reset == true) imgSection.replaceChildren(...newImages);
    setModals();
}

document.body.addEventListener('scroll', () => {
    if(body.scrollTop + window.innerHeight >= body.scrollHeight - 15){
        printImgs(imgMatches, false);
    }
})

var msgElem = document.getElementById("message");
function printMsg(tag){
    let msgData = database.messages[tag];

    if(msgData){
        msgElem.innerHTML = msgData
        msgElem.style.display = 'block';
    }
    else{
        msgElem.innerHTML = "";
        msgElem.style.display = 'none';
    }
}

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
        fullURL = fullURL.replace(".webp", ".jpg");
        modalImg.src = fullURL;
        gtag('event', 'image_clicked', {
            'url': fullURL
        });
      }
    }
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
    }
  }