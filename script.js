let events = [];
let archive = [];

let btns = document.querySelectorAll(".sidebar__btn");
let screens = document.querySelectorAll(".screen");

function screenswitcher(indix) {
  screens.forEach((section) => {
    const datascreen = indix.dataset.screen;
    section.classList.remove("is-visible");

    if (section.dataset.screen === datascreen) {
      section.classList.add("is-visible");
    }
  });
  btns.forEach((btn) => {
    btn.classList.remove("is-active");
    const databutton=indix.dataset.screen;
    if (btn.dataset.screen===databutton) {
      btn.classList.add("is-active");
    }
  });
}
