/* -------------------------------------------------------------------------- */
/*                                    hero                                    */
/* -------------------------------------------------------------------------- */
let items = document.querySelectorAll(".slider .list .item");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

let countItem = items.length;
let itemActive = 0;

let autoSlideInterval = setInterval(nextSlide, 5000);

const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
};

const changeSlide = (direction) => {
    itemActive = (itemActive + direction + countItem) % countItem;
    showSlider();
    moveThumbnail(itemActive);
};

nextBtn.addEventListener("click", () => {
    changeSlide(1);
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    changeSlide(-1);
    resetAutoSlide();
});

function nextSlide() {
    changeSlide(1);
}

function moveThumbnail(index) {
    // returns the number of pixels from the left edge of the container to the left edge of the active thumbnail. 
    // OR measures the horizontal position of the thumbnail within the container.
    let thumbnailWidth = thumbnails[0].offsetWidth;
    let thumbnailContainer = document.querySelector(".thumbnail");
    let thumbnailScrollLeft = thumbnailContainer.scrollLeft;
    let thumbnailOffsetLeft = thumbnails[index].offsetLeft;

    // thumbnail is to the left of the visible area
    // --> scroll thumbnail smoothly to the left
    if (thumbnailOffsetLeft < thumbnailScrollLeft) {
        thumbnailContainer.scrollTo({
            left: thumbnailOffsetLeft,
            behavior: "smooth",
        });
    // thumbnail is to the right of the visible area
    // --> scroll thumbnail smoothly to the right
    } else if (
        thumbnailOffsetLeft + thumbnailWidth >
        thumbnailScrollLeft + thumbnailContainer.offsetWidth
    ) {
        thumbnailContainer.scrollTo({
            left: thumbnailOffsetLeft - thumbnailContainer.offsetWidth + thumbnailWidth,
            behavior: "smooth",
        });
    }
}

// remove old active item to new active
function showSlider() {
    document.querySelector(".slider .list .item.active").classList.remove("active");
    document.querySelector(".thumbnail .item.active").classList.remove("active");

    items[itemActive].classList.add("active");
    thumbnails[itemActive].classList.add("active");
}

// makes thumbnails clickable and executes necessary functions
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        itemActive = index;
        showSlider();
        moveThumbnail(itemActive);
        resetAutoSlide();
    });
});
/* -------------------------------------------------------------------------- */
/*                                  previews                                  */
/* -------------------------------------------------------------------------- */
// this feature was written with Open AI's ChatGPT model
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelector("img");
const arrowButtons = document.querySelectorAll(".wrapper button");

// tracks mouse dragging status
let isDragStart = false;
let isDragging = false;

// saves previous position of mouse
let prevPageX;
// saves previous scroll position of the carousel
let prevScrollLeft;
// difference between current and previous mouse position
let positionDiff;

//adds event listeners to the arrow buttons to adjust the scroll position of the carousel
arrowButtons.forEach(button => {
    button.addEventListener("click", () => {
        // calculates the scroll amount based on the width of the first image plus 14px margin-left
        const firstImgWidth = firstImg.clientWidth + 14;
        const scrollAmount = button.id === "left" ? -firstImgWidth : firstImgWidth;
        carousel.scrollLeft += scrollAmount;
    });
});

// adjusts the scroll position so that the carousel stops at an image
const adjustScrollPosition = () => {
    // prevents adjustment if the carousel is at the beginning or end
    if (carousel.scrollLeft <= 0 || carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1) return;

     // calculates the absolute difference of the position change
    positionDiff = Math.abs(positionDiff);
    const firstImgWidth = firstImg.clientWidth + 14;
    const valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        // scrolls further if the difference is greater than a third of the image width, otherwise backwards
        carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    } else {
        // scrolls back if the difference is greater than a third of the image width, otherwise continue
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
};

// starts the drag process and saves the current mouse/touch position and the scroll position
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};
// handles the dragging process and updates the scroll position based on the mouse/touch movement
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
};
// ends the drag process and adjusts the scroll position so that the carousel stops at an image
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    adjustScrollPosition();
};

// adds event listeners for the dragging process for mouse and touch events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);