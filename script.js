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
  listevents();
});

/////// ancrumenter le nombre total d events dashboard

function cntrtotalevent() {
  // jai selecter les elements
  const totleeventcntr = document.querySelector("#stat-total-events");
  const totaleseatscntr = document.querySelector("#stat-total-seats");
  const totalepricecntr = document.querySelector("#stat-total-price");
  //calculer total d events
  let cntrevent = events.length;
  //calculer le total de seats
  const totalseats = events.reduce((valeurinitseats, event) => {
    return valeurinitseats + Number(event.nombrseats);
  }, 0);
  //calculer le totale de prix
  const totalprice = events.reduce((valeurinitprix, event) => {
    return valeurinitprix + Number(event.prix);
  }, 0);
  //affecter les resultats
  totaleseatscntr.textContent = totalseats;
  totleeventcntr.textContent = cntrevent;
  totalepricecntr.textContent = "$" + totalprice;
}


function listevents() {
  const tbody = document.querySelector(".table__body");
  let cntrevent = 1;
  tbody.innerHTML = "";
  events.forEach((event) => {
    tbody.innerHTML += `
    <tr class="table__row" >
        <td>${cntrevent++}</td>
        <td>${event.title}</td>
        <td>${event.nombrseats}</td>
        <td><span class="badge">${event.prix}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" onclick="detailstable(this)" data-event-id="1">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="1">Edit</button>
          <button class="btn btn--danger btn--small" onclick="deletetable(this)" data-action="archive" data-event-id="1">Delete</button>
        </td>
    </tr>`;
  });
}
function deletetable(index) {
  const trdelete = index.closest(".table__row");
  // archive.push(trdelete.textContent);
  // console.log(archive);
  trdelete.remove();
}
