/* 2020-2024 Peter Ursem */

class Collection {
    static collections = {};

    static get(name) {
        return Collection.collections[name];
    }

    static addToList(collection) {
        Collection.collections[collection.title] = collection;
    }

    constructor(collectionData) {
        this.images = collectionData.imgs;
        this.favs = collectionData.favs;
        this.numFavs = collectionData.numFavs;
        this.gridItems = [];
        this.defineElements(collectionData.title, collectionData.date);
        this.populateCollection();
        return this.collectionElem;
    }

    initMasonry() {
        //Create new Masonry instance
        let msnry = new Masonry(this.grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            percentPosition: true
        }),
        calcSize = () => this.calcSize(this),
        gridItems = this.gridItems;

        //Expand the background once the grid is computed.
        msnry.on('layoutComplete', function () {
            calcSize();
        });

        imagesLoaded(this.grid, () => {
            msnry.layout();
            calcSize();
            gridItems.forEach(item => item.setModal());
        });
    }

    defineElements(title, date) {
        const infoCard = document.createElement('div'),
            titleElem = document.createElement('h1'),
            dateElem = document.createElement('h2');
        titleElem.textContent = title;
        dateElem.textContent = date;
        infoCard.classList.add('title-text');
        infoCard.appendChild(titleElem);
        infoCard.appendChild(dateElem);

        this.grid = document.createElement('div');
        this.gridSizer = document.createElement('div'),
        this.gutterSizer = document.createElement('div');

        //Define empty sizing divs for Masonry
        this.gridSizer.classList.add('grid-sizer');
        this.gutterSizer.classList.add('gutter-sizer');
        this.grid.classList.add('grid');
        this.grid.appendChild(this.gridSizer);
        this.grid.appendChild(this.gutterSizer);

        const bottomElem = document.createElement('div');
        bottomElem.classList.add('bottom');

        const collectionBg = document.createElement('div'),
        randomBackground = this.images[this.favs[Math.floor(Math.random() * this.favs.length)]];
        collectionBg.classList.add('background');
        collectionBg.style.background = "center / cover url(/thumbs/" + randomBackground.url + ".webp)";

        this.collectionElem = document.createElement('div');
        this.collectionElem.classList.add('collection');
        this.collectionElem.id = title;
        this.collectionElem.appendChild(collectionBg);
        this.collectionElem.appendChild(infoCard);
        this.collectionElem.appendChild(this.grid);
        this.collectionElem.appendChild(bottomElem);
    }

    createExpansionToggle() {
        let expandToggle = document.createElement("button");
        expandToggle.innerText = "Expand";
        expandToggle.onclick = () => {
            this.expand(expandToggle.innerText == "Expand");
            if (expandToggle.innerText == "Expand") {
                expandToggle.innerText = "Collapse";
            } else {
                expandToggle.innerText = "Expand";
            }
        };
        this.collectionElem.querySelector(".bottom").appendChild(expandToggle);
    }

    populateCollection(expanded = false) {
        if (expanded) {
            this.images.forEach(img => {
                if (img.tags.indexOf("hide") == -1) {
                    //Wrap each image before adding it to the grid.
                    let newItem = new GridItem(img);
                    this.gridItems.push(newItem);
                    this.grid.appendChild(newItem.gridElem);
                }
            });
        //If the grid is not expanded and the "fav" images fit in the given number.
        } else if (this.favs.length <= this.numFavs) {
            this.favs.forEach(fav => {
                //Wrap each image before adding it to the grid.
                let newItem = new GridItem(this.images[fav]);
                this.gridItems.push(newItem);
                this.grid.appendChild(newItem.gridElem);
            });
        //If the grid is not expanded and there are too many "fav" images to fit.
        } else {
            //Copy the list of indexes for "fav" images.
            let possibleFavs = [...this.favs];
            for (let i = 0; i < this.numFavs; i++) {
                //Get a random index from the "favs".
                let index = Math.floor(Math.random() * possibleFavs.length);
                let newItem = new GridItem(this.images[possibleFavs[index]]);
                this.gridItems.push(newItem);
                this.grid.appendChild(newItem.gridElem);
                possibleFavs.splice(index, 1);
            }
        }
        
        //If there are more images and no expand button, create one.
        if (this.images.length > this.numFavs && !this.collectionElem.querySelector(".bottom>button")) {
            this.createExpansionToggle();
        }

        this.initMasonry();
    }

    calcSize(collection) {
        collection.collectionElem.style.height = parseFloat(this.grid.style.height) + 300 + 'px';
        collection.grid.style.marginTop = -parseFloat(this.grid.style.height) - 125 + 'px';
    }

    expand(state) {
        this.grid.innerHTML = '';
        this.grid.appendChild(this.gridSizer);
        this.grid.appendChild(this.gutterSizer);
        this.populateCollection(state)
        this.initMasonry();
    }
}

class GridItem {
    constructor(img) {
        this.tags = [...img.tags];
        this.imgElem = document.createElement('img');
        this.imgElem.src = '/thumbs/' + img.url + '.webp';
        this.gridElem = document.createElement('div');
        this.gridElem.classList.add('grid-item');
        this.gridElem.appendChild(this.imgElem);
        return this;
    }

    setModal() {
        var modal = document.getElementById("img-modal");
        var modalImg = document.getElementById("modal-img");

        let orientation = ""
        if (this.imgElem.naturalWidth > this.imgElem.naturalHeight) orientation = "landscape";
        else orientation = "portrait";
        this.gridElem.classList.add(orientation);
        this.imgElem.onclick = function () {
                modal.style.display = "block";
                let fullURL = this.src.replace("thumbs", "images");
                fullURL = fullURL.replace(".webp", ".jpg");
                modalImg.src = fullURL;
                gtag('event', 'image_clicked', {'url': fullURL});
        }
        //Close button
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
                modal.style.display = "none";
        }
    }
}

function setupPage() {
    fetch('images/database.json')
        .then(result => result.json())
        .then(data => {
            data.content.reverse().forEach((collectionData) => {
                let newCollection = new Collection(collectionData)
                Collection.addToList(newCollection);
                document.getElementById("imgs").appendChild(newCollection);
            })
        });
}

setupPage();