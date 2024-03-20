/* 2020-2024 Peter Ursem */

export function loadData() {
        return new Promise((res, rej) => {
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

function fillPage(data) {
        return new Promise((res, rej) => {
                data.forEach((collection) => {
                        setupCollection(collection.title, collection.date)
                                .then((grid) => {
                                        populateGrid(grid, collection.imgs, collection.favs, collection.numFavs)
                                                .then(() => res());
                                });

                });
        });
}

function setupCollection(title, date) {
        return new Promise((res, rej) => {
                const collectionElem = document.createElement('div'),
                        collectionBg = document.createElement('div'),
                        infoCard = document.createElement('div'),
                        titleElem = document.createElement('h1'),
                        dateElem = document.createElement('h2'),
                        grid = document.createElement('div'),
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

                infoCard.classList.add('titleText');
                infoCard.appendChild(titleElem);
                infoCard.appendChild(dateElem);

                collectionBg.classList.add('background')

                collectionElem.classList.add('collection');
                collectionElem.id = title;
                collectionElem.appendChild(collectionBg);
                collectionElem.appendChild(infoCard);
                collectionElem.appendChild(grid);

                res(grid);
        });
}

function populateGrid(grid, imgs, favs, numFavs) {
        return new Promise((res, rej) => {
                if (favs.length > numFavs) {
                        let possibleFavs = favs;
                        for (let i = 0; i < numFavs; i++) {
                                let index = Math.floor(Math.random() * possibleFavs.length);
                                grid.appendChild(createGridItem(imgs[possibleFavs[index]].url));
                                possibleFavs.splice(index, 1);
                        }
                }
                else {
                        favs.forEach(fav => {
                                grid.appendChild(createGridItem(imgs[fav].url));
                        });
                }
                grid.parentNode.firstElementChild.style.backgroundImage = "url(/thumbs/" + imgs[favs[Math.floor(Math.random()*favs.length)]].url + ".webp)";
                document.getElementById('imgs').appendChild(grid.parentNode);
                res();
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