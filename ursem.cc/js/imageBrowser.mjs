/* 2020-2024 Peter Ursem */

import { loadData } from "./imageLoader.mjs";
import { setModals } from "./modal.mjs";

//Find every .grid element
loadData()
.then(() => {
        initMasonry();
        //document.dispatchEvent(new Event('needsLayout'));
});

function initMasonry() {
        document.querySelectorAll('.grid').forEach((grid) => {

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

                imagesLoaded(grid, () => {
                        msnry.layout();
                        resizeCollection(grid);
                        setModals(document.querySelectorAll('.grid img'));
                });
        });
}

function resizeCollection(grid) {
        const collection = grid.parentNode;
        collection.style.height = (parseFloat(grid.style.height) / parseFloat(window.innerHeight) * 100) + 25 + 'vh';
        grid.style.marginTop = -100 * (parseFloat(grid.style.height) / parseFloat(window.innerHeight)) - 10 + 'vh';
}