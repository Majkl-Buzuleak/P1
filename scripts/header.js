/* -------------------------------------------------------------------------- */
/*                                   header                                   */
/* -------------------------------------------------------------------------- */
const toggleNav = document.querySelector(".toggle-nav");
const toggleNavImg = document.querySelector(".toggle-nav img");
const dropDownNav = document.querySelector(".dropdown-nav");

toggleNav.addEventListener("click", () => {
    dropDownNav.classList.toggle("open");

    if (dropDownNav.classList.contains("open")) {
        toggleNavImg.src = "assets/images/icons/close.svg";
    } else {
        toggleNavImg.src = "assets/images/icons/menu.svg";
    }
});