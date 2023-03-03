/*          Tha Site         */
/**** Indecisive CRM v0.1 ****/

import DataHandler from './db-handler.mjs';
import Scroller from './scroll.mjs';
import Photo from './photo.mjs';

//######## Cover Image ########//

const themeColors = ['#6cb8c5','#84c09e','#ecdb64','#de6e5a'];

let coverDiv = document.getElementById('sitecover');
function setCover() {
    const coverIndex = Math.ceil(Math.random() * 7);
    if(coverDiv) 
        coverDiv.style.backgroundImage = 'url(covers/cover'+coverIndex+'.png)';
    else
        console.warn("Couldn't define 'sitecover' div");
    let peterText = document.createElement('h1');
    peterText.innerText = 'Peter';
    peterText.style.color = getThemeColor();
    peterText.style.top = getRandHeight();
    let ursemText = document.createElement('h1');
    ursemText.innerText = 'Ursem';
    ursemText.id = 'last';
    ursemText.style.color = getThemeColor();
    ursemText.style.top = getRandHeight();
    coverDiv.appendChild(peterText);
    coverDiv.appendChild(ursemText);
}

function getThemeColor() {
    return themeColors[Math.floor(Math.random() * themeColors.length)];
}

function getRandHeight() {
    return (Math.floor(Math.random() * (window.innerHeight - 300)) + 'px');
}

//######## DB Wrapper ########//
function initPage(){
    db.init.then(() => {
        new Photo(db.getNextImg());
        new Photo(db.getNextImg());
    });
}

//######## Run ########//
setCover();

let db = new DataHandler();
initPage();

const scroller = new Scroller();
scroller.addEventListener('scrollFinished', () => {
    if(Photo.loading == false) {
        Photo.loading = true;
        new Photo(db.getRandomImg());
        Photo.removeFirstPhoto();
    }
});

//if existing and next photo are vertical, slide in from right and display side by side, bump the last off if more vertical come in.
//Shuffle / ordered toggle
//fix bg scrolling
//fix half scroll glitch
//style firework toggle (as firework)