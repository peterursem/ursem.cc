/* 2020-2024 Peter Ursem */

import { getCollection, loadData, populateGrid } from "./imageLoader.mjs";
import { setModals } from "./modal.mjs";

//Find every .grid element
loadData()
        .then(() => {
                initMasonry();
                //document.dispatchEvent(new Event('needsLayout'));
        });

function layoutGrid(grid, masonryInstance) {
        imagesLoaded(grid, () => {
                masonryInstance.layout();
                resizeCollection(grid);
                setModals(grid.querySelectorAll('.grid img'));
        });
}

function initMasonry() {
        document.querySelectorAll('.grid').forEach((grid) => {
                initGridMasonry(grid);
        });
}

function initGridMasonry(grid) {
        //Create new Masonry instance
        var msnry = new Masonry(grid, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                percentPosition: true
        });

        //Expand the background once the grid is computed.
        msnry.on('layoutComplete', function () {
                resizeCollection(grid);
        });

        let expandToggle = grid.parentElement.querySelector("button");
        if (expandToggle && !expandToggle.onclick) expandToggle.onclick = () => {
                toggleCollectionExpansion(grid, expandToggle.innerText == "Expand");
                if (expandToggle.innerText == "Expand") {
                        expandToggle.innerText = "Collapse";
                } else {
                        expandToggle.innerText = "Expand";
                }
        };

        layoutGrid(grid, msnry);
}

function toggleCollectionExpansion(grid, state) {
        let collection = getCollection(grid.parentElement.querySelector(".title-text>h1").innerText),
                gridSizer = document.createElement('div'),
                gutterSizer = document.createElement('div');

        gridSizer.classList.add('grid-sizer');
        gutterSizer.classList.add('gutter-sizer');
        grid.innerHTML = '';
        grid.appendChild(gridSizer);
        grid.appendChild(gutterSizer);
        populateGrid(grid, collection.imgs, collection.favs, collection.numFavs, state)
                .then(() => {
                        initGridMasonry(grid);
                });
}

function resizeCollection(grid) {
        const collection = grid.parentNode;
        collection.style.height = parseFloat(grid.style.height) + 300 + 'px';
        grid.style.marginTop = -parseFloat(grid.style.height) - 125 + 'px';
}