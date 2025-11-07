let events = [];
let archive = [];

let btns = document.querySelectorAll(".sidebar__btn");
let screens = document.querySelectorAll(".screen");

function screenswitcher(indix) {
  screens.forEach((section) => {
    const datascreen = indix.dataset.screen;
    section.classList.remove("is-visible");
    const eatatsection=section.dataset.screen
    if (section.dataset.screen === datascreen) {
      section.classList.add("is-visible");
    }
  });
  btns.forEach((btn) => {
    btn.classList.remove("is-active");
    const databutton = indix.dataset.screen;
    const etatbtn =btn.dataset.screen
    if (etatbtn === databutton) {
      btn.classList.add("is-active");
    }
  });
}
////// form valiudatin

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const regextitle = /^[a-zA-ZÀ-ÿ0-9\s'.,-]{2,100}$/;
  const regeximageurl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
  const regexdescription = /^[\wÀ-ÿ\s.,'?!-]{10,500}$/;
  const regexnombrseats = /^[1-9][0-9]{0,2}$/;
  const regexprixbase = /^(?:\d+|\d+\.\d{1,2})$/;
  const title = document.querySelector("#event-title").value.trim();
  const imageurl = document.querySelector("#event-image").value.trim();
  const description = document.querySelector("#event-description").value.trim();
  const nombrseats = document.querySelector("#event-seats").value.trim();
  const prixbase = document.querySelector("#event-price").value.trim();
  const errormsg = document.querySelector(".alert");
  if (!regextitle.test(title)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "title est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }
  if (!regeximageurl.test(imageurl)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "imageurl est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }
  if (!regexdescription.test(description)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "description est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }
  if (!regexnombrseats.test(nombrseats)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "nombrseats est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }
  if (!regexprixbase.test(prixbase)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "prix est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }
  function delay() {
    form.reset();
  }
  setTimeout(delay,5000)
  
  
});