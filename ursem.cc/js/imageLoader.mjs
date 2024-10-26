/* 2020-2024 Peter Ursem */

export function loadData() {
        return new Promise(res => {
                fetch('images/database.json')
                        .then(result => {
                                result.json()
                                        .then(data => {
                                                fillPage(data.content.reverse())
                                                        .then(() => res());
                                        })
                        });
        });
}

var collections = {};
export function getCollection(name) {
        return collections[name];
}

function fillPage(data) {
        return new Promise(res => {
                data.forEach((collection) => {
                        collections[collection.title] = collection;
                        setupCollection(collection.title, collection.date)
                                .then((grid) => {
                                        populateGrid(grid, collection.imgs, collection.favs, collection.numFavs)
                                                .then((grid) => {
                                                        document.getElementById('imgs').appendChild(grid.parentNode);

                                                        res();
                                                });
                                });

                });
        });
}

function setupCollection(title, date) {
        return new Promise(res => {
                const collectionElem = document.createElement('div'),
                        collectionBg = document.createElement('div'),
                        infoCard = document.createElement('div'),
                        titleElem = document.createElement('h1'),
                        dateElem = document.createElement('h2'),
                        grid = document.createElement('div'),
                        bottomElem = document.createElement('div'),
                        gridSizer = document.createElement('div'),
                        gutterSizer = document.createElement('div');

                //Define empty sizing divs for Masonry
                gridSizer.classList.add('grid-sizer');
                gutterSizer.classList.add('gutter-sizer');

                grid.classList.add('grid');
                grid.appendChild(gridSizer);
                grid.appendChild(gutterSizer);

                titleElem.textContent = title;
                dateElem.textContent = date;

                infoCard.classList.add('title-text');
                infoCard.appendChild(titleElem);
                infoCard.appendChild(dateElem);

                bottomElem.classList.add('bottom');
                collectionBg.classList.add('background');

                collectionElem.classList.add('collection');
                collectionElem.id = title;
                collectionElem.appendChild(collectionBg);
                collectionElem.appendChild(infoCard);
                collectionElem.appendChild(grid);
                collectionElem.appendChild(bottomElem);

                res(grid);
        });
}

export function populateGrid(grid, imgs, favs, numFavs, expanded = false) {
        return new Promise(res => {

                if (expanded) {
                        imgs.forEach(img => {
                                if (img.tags.indexOf("hide") == -1) {
                                        grid.appendChild(createGridItem(img.url));
                                }
                        });
                } else if (favs.length >= numFavs) {
                        let possibleFavs = [...favs];
                        for (let i = 0; i < numFavs; i++) {
                                let index = Math.floor(Math.random() * possibleFavs.length);
                                grid.appendChild(createGridItem(imgs[possibleFavs[index]].url));
                                possibleFavs.splice(index, 1);
                        }
                } else {
                        favs.forEach(fav => {
                                grid.appendChild(createGridItem(imgs[fav].url));
                        });
                }

                if (imgs.length > favs.length && !grid.parentNode.querySelector(".bottom>button")) {
                        let expandToggle = document.createElement("button");
                        expandToggle.innerText = "Expand";
                        grid.parentNode.querySelector(".bottom").appendChild(expandToggle);
                }

                let randomBackground = imgs[favs[Math.floor(Math.random() * favs.length)]],
                        backgroundElem = grid.parentNode.firstElementChild
                if (backgroundElem.style.background == "") {
                        backgroundElem.style.background = "center / cover url(/thumbs/" + randomBackground.url + ".webp)";
                }
                res(grid);
        });

}

function createGridItem(imgUrl) {
        const img = document.createElement('img'),
                gridItem = document.createElement('div');
        img.src = '/thumbs/' + imgUrl + '.webp';
        gridItem.classList.add('grid-item');
        gridItem.appendChild(img);
        return gridItem;
}