/* -------------------------------------------------------------------------- */
/*                                  lightbox                                  */
/* -------------------------------------------------------------------------- */
const galleryItem = document.getElementsByClassName("gallery-item");

const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");

lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("lightbox-prev");
lightBoxNext.classList.add("lightbox-next");

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
document.body.appendChild(lightBoxContainer);

let index = 1;

// shows img with index 'n' and sets the source of selected image
function showLightBox(n) {
    if (n > galleryItem.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItem.length;
    }

    let imageLocation = galleryItem[index - 1]
        .querySelector("img")
        .getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
}

// click img --> show img in the lightbox
function currentImage() {
    // displays the lightbox
    lightBoxContainer.style.display = "flex";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox((index = imageIndex));
}

// for every gallery-item, call currentImage() when an image is clicked
for (let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener("click", currentImage);
}

// changes index to the next or pevious img
function sliderImage(n) {
    showLightBox((index += n));
}

function prevImage() {
    sliderImage(-1);
}

function nextImage() {
    sliderImage(1);
}

lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);


function closeLightBox() {
    if (this === event.target) {
        lightBoxContainer.style.display = "none";
    }
}

lightBoxContainer.addEventListener("click", closeLightBox);