export default class DataHandler {
    #possibleImgs = [];

    init = new Promise((res) => {
        fetch('/images/database.json')
        .then(result => result.json())
        .then(data => {
            this.#possibleImgs = data.images;
            for(let photo of this.#possibleImgs) {
                photo.url = photo.url.replace('thumbs', 'images');
                photo.url = photo.url.replace('.webp', '.jpg');
            }
        })
        .then(() => res());
    });

    getRandomImg() {
        if(this.#possibleImgs.length > 0)
            return this.#possibleImgs.splice(Math.floor(Math.random() * this.#possibleImgs.length), 1)[0];
        else
            return null;
    }

    getNextImg() {
        if(this.#possibleImgs.length > 0)
            return this.#possibleImgs.pop();
        else
            return null;
    }
}