export default class DataHandler {

    #possibleImgs = [];
    #allImgs = [];

    init = new Promise((res) => {
        fetch('/images/database.json')
        .then(result => result.json())
        .then(data => {
            this.#possibleImgs = data.images;
            for(let photo of this.#possibleImgs) {
                photo.url = photo.url.replace('thumbs', 'images');
                photo.url = photo.url.replace('.webp', '.jpg');
                this.#allImgs.push(photo);
            }
        })
        .then(() => res());
    });

    #resetQueue() {
        this.#possibleImgs = [];
        for(let img of this.#allImgs){
            this.#possibleImgs.push(img);
        }
    }

    #sortType = 'sort';
    toggleSortType() {
        switch (this.#sortType) {
            case 'sort':
                this.#sortType = 'shuffle';
            break;
            case 'shuffle':
                this.#resetQueue();
                this.#sortType = 'sort';
            break; 
        }
        return this.#sortType;
    }

    getNextImg() {
        if(this.#possibleImgs.length > 0) {
            switch (this.#sortType) {
                case 'sort':
                    return this.#possibleImgs.pop();
                case 'shuffle':
                    return this.#possibleImgs.splice(Math.floor(Math.random() * this.#possibleImgs.length), 1)[0];
            }
        }
        else {
            this.#resetQueue();
            return this.getNextImg();
        }
    }
}