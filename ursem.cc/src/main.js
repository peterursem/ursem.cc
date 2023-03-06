/*          Tha Site         */
/**** Indecisive CRM v0.1 ****/

import DataHandler from './db-handler.mjs';
import Scroller from './scroll.mjs';
import Photo from './photo.mjs';

//######## Cover Image ########//

function setCover() {
    let coverDiv = document.getElementById('sitecover');
    const coverIndex = Math.ceil(Math.random() * 7);
    coverDiv.style.backgroundImage = 'url(covers/cover'+coverIndex+'.png)';

    let first = document.getElementById("first");
    let last = document.getElementById("last");
    first.style.color = getThemeColor();
    first.style.bottom = getRandHeight('first');
    last.style.color = getThemeColor();
    last.style.bottom = getRandHeight('last');
    coverDiv.appendChild(first);
    coverDiv.appendChild(last);
}

function getThemeColor() {
    const themeColors = ['#6cb8c5','#84c09e','#ecdb64','#de6e5a'];
    return themeColors[Math.floor(Math.random() * themeColors.length)];
}

let height = 100;
function getRandHeight() {
    height = Math.floor(Math.random() * (height - 10));
    return 'min(max(' + height + '% , 5%), calc(100% - 200px))';
}

//######## Photo Page ########//

function initPage(){
    db.init.then(() => {
        new Photo(db.getNextImg());
        new Photo(db.getNextImg());
    });
}

//######## Run ########//

let db = new DataHandler();
const scroller = new Scroller();

setCover();
initPage();

scroller.addEventListener('scrollFinished', () => {
    if(Photo.loading == false) {
        Photo.loading = true;
        new Photo(db.getNextImg());
        Photo.removeFirstPhoto();
    }
});

let shuffleImg = document.getElementById('shuffleImg');
shuffleImg.onclick = function() {  
    shuffleImg.src = '/images/web/' + db.toggleSortType() + '.svg';
    Photo.removeLastPhoto();
    new Photo(db.getNextImg());
}

//if existing and next photo are vertical, slide in from right and display side by side, bump the last off if more vertical come in.
//fix bg scrolling
//code based photo / album lookup