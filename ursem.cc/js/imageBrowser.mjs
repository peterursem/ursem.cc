import { loadData } from "./imageLoader.mjs";
import { setModals } from "./modal.mjs";

//Find every .grid element
loadData()
.then(() => initMasonry());

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
                        console.log(grid.parentNode);
                        const collection = grid.parentNode;
                        collection.style.height = (parseFloat(grid.style.height) / parseFloat(window.innerHeight) * 100) + 25 + 'vh';
                        grid.style.marginTop = -100 * (parseFloat(grid.style.height) / parseFloat(window.innerHeight)) - 10 + 'vh';
                });
        
                //Recompute the layout and set modals once images have loaded
                imagesLoaded(grid, () => {
                        msnry.layout();
                        setModals(document.querySelectorAll('.grid img'));
                });
        });
}
