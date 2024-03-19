export function setModals(imgs) {
        var modal = document.getElementById("imgModal");
        var modalImg = document.getElementById("modalImg");

        for (var img of imgs) {
                var orientation = ""
                if (img.naturalWidth > img.naturalHeight) orientation = "landscape";
                else orientation = "portrait";
                img.parentElement.classList.add(orientation);
                img.onclick = function () {
                        modal.style.display = "block";
                        let fullURL = this.src.replace("thumbs", "images");
                        fullURL = fullURL.replace(".webp", ".jpg");
                        modalImg.src = fullURL;
                        gtag('event', 'image_clicked', {
                                'url': fullURL
                        });
                }
        }

        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
                modal.style.display = "none";
        }
}