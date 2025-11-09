let events = [];
let archive = [];

let btns = document.querySelectorAll(".sidebar__btn");
let screens = document.querySelectorAll(".screen");

function screenswitcher(indix) {
  screens.forEach((section) => {
    const datascreen = indix.dataset.screen;
    section.classList.remove("is-visible");
    const eatatsection = section.dataset.screen;
    if (eatatsection === datascreen) {
      section.classList.add("is-visible");
    }
  });
  btns.forEach((btn) => {
    btn.classList.remove("is-active");
    const databutton = indix.dataset.screen;
    const etatbtn = btn.dataset.screen;
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

  let objetdata = {
    title: title,
    image: imageurl,
    description: description,
    nombrseats: nombrseats,
    prix: prixbase,
  };
  events.push(objetdata);
  console.log(events);
  form.reset();
  cntrtotalevent();
});

let cntrvariant = 0;
function addvariante() {
  cntrvariant++;
  const variantslist = document.querySelector(".variants__list");
  variantslist.innerHTML += `
      <div class="variant-row">
          <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
          <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
          <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
          <select class="select variant-row__type">
            <option value="fixed">Fixed Price</option>
            <option value="percentage">Percentage Off</option>
          </select>
          <button type="button" class="btn btn--danger btn--small variant-row__remove" onclick="deletevariante(this)">Remove</button>
      </div>
    `;
  console.log(cntrvariant);
}

function deletevariante(index) {
  let deletedvariante = index.closest(".variant-row");
  deletedvariante.remove();
  cntrvariant--;
  
}
console.log(cntrvariant);
