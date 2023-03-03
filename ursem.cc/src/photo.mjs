export default class Photo {

    elem;

    constructor(img) {
        Photo.loading = true;
        this.elem = document.createElement('img');
        this.elem.src = img.url;
        this.elem.onload = function() {
            Photo.setLastImgDims();
            Photo.loading = false;
        };
        Photo.imgDiv.appendChild(this.elem);
        Photo.bgDiv.appendChild(this.elem.cloneNode());
    }

    static loading = false;
    static imgDiv = document.getElementById('imgs');
    static bgDiv = document.getElementById('bgs');

    static removeFirstPhoto() {
        this.imgDiv.removeChild(this.imgDiv.firstElementChild);
        this.bgDiv.removeChild(this.bgDiv.firstElementChild);
    }

    static removeLastPhoto() {
        this.imgDiv.removeChild(this.imgDiv.lastElementChild);
        this.bgDiv.removeChild(this.bgDiv.lastElementChild);
    }

    static setLastImgDims() {
        if(this.imgDiv) {
            let imgElem = this.imgDiv.lastElementChild;
            if(!imgElem)
                return;
            if (imgElem.src == undefined)
                this.removeLastPhoto();
            var orientation = "";
            if(imgElem.naturalWidth > imgElem.naturalHeight) 
                orientation = "horizontal";
            else 
                orientation = "vertical";
            imgElem.classList.add(orientation);
        }
    }
}