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
  localStorage.setItem("event", JSON.stringify(events));
  console.log(events);
  form.reset();
  listevents();
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
const tbody = document.querySelector(".table__body");
function listevents() {
  const tbody = document.querySelector(".table__body");
  events = JSON.parse(localStorage.getItem("event")) || [];
  tbody.innerHTML = "";
  events.forEach((event, index) => {
    tbody.innerHTML += `
    <tr class="table__row" >
        <td>${index + 1}</td>
        <td>${event.title}</td>
        <td>${event.nombrseats}</td>
        <td><span class="badge">${event.prix}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" onclick="detailstable(${index})" data-event-id="1">Details</button>
          <button class="btn btn--small" data-action="edit" onclick="edittable(${index})" data-event-id="1">Edit</button>
          <button class="btn btn--danger btn--small" onclick="deletetable(${index})" data-action="archive" data-event-id="1">Delete</button>
        </td>
    </tr>`;
  });
}
listevents();

function deletetable(index) {
  archive.push(events[index]);
  console.log(archive);
  localStorage.setItem("arch", JSON.stringify(archive));
  events.splice(index, 1);
  localStorage.setItem("event", JSON.stringify(events));
  listevents();
  listarchive();
}

const divmodal = document.querySelector(".modal");
const edit_modal = document.querySelector(".edit-modal");

function edittable(index) {
  edit_modal.classList.remove("is-hidden");
  const editmodal__body = document.querySelector(".editmodal__body");

  editmodal__body.innerHTML = `
      <form class="form" id="event-form">
                            <!-- Error messages area -->
                            <div class="alert alert--error is-hidden" id="form-errors"></div>

                            <!-- Title -->
                            <div class="form__group">
                                <label class="form__label" for="event-title">Event Title</label>
                                <input 
                                    type="text" 
                                    id="edit-title" 
                                    class="input" 
                                    placeholder="Enter event title"
                                    value=${events[index].title}
                                    required
                                >
                            </div>

                            <!-- Image URL -->
                            <div class="form__group">
                                <label class="form__label" for="event-image">Image URL</label>
                                <input 
                                    type="url" 
                                    id="edit-image" 
                                    class="input" 
                                    placeholder="https://example.com/image.jpg"
                                    value=${events[index].image}
                                >
                            </div>
                            <br>
                            <div class="image_container">

                            </div>

                            <!-- Description -->
                            <div class="form__group">
                                <label class="form__label" for="event-description">Description</label>
                                <textarea 
                                    id="edit-description" 
                                    class="input" 
                                    placeholder="Describe the event..."
                                    rows="4"
                                >${events[index].description}</textarea>
                            </div>

                            <!-- Seats -->
                            <div class="form__group">
                                <label class="form__label" for="event-seats">Number of Seats</label>
                                <input 
                                    type="number" 
                                    id="edit-seats" 
                                    class="input" 
                                    placeholder="100"
                                    min="1"
                                    value=${events[index].nombrseats}
                                    required
                                >
                            </div>

                            <!-- Base Price -->
                            <div class="form__group">
                                <label class="form__label" for="event-price">Base Price ($)</label>
                                <input 
                                    type="number" 
                                    id="edit-price" 
                                    class="input" 
                                    placeholder="50.00"
                                    min="0"
                                    step="0.01"
                                    value=${events[index].prix}
                                    required
                                >
                            </div>

                            <!-- VARIANTS SECTION 
                            <fieldset class="variants">
                                <legend class="variants__title">
                                    Pricing Variants (Optional)
                                    <button type="button" class="btn btn--small" onclick="addvariante()" id="btn-add-variant">+ Add Variant</button>
                                </legend>
                                
                                <!-- Variant rows will be appended here by JS -->
                                <div id="variants-list" class="variants__list">
                                    <!-- EXAMPLE: Students should clone this structure -->
                                    <!-- 
                                    <div class="variant-row">
                                        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
                                        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
                                        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
                                        <select class="select variant-row__type">
                                            <option value="fixed">Fixed Price</option>
                                            <option value="percentage">Percentage Off</option>
                                        </select>
                                        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
                                    </div>
                                    -->
                                </div>
                            </fieldset>-->

                            <!-- Submit Button -->
                            <div class="form__actions">
                                <button type="button" onclick="Enregestrer(${index})" class="btn btn--primary">Enregestrer</button>
                                
                            </div>
                        </form>
  `;
}
function Enregestrer(index) {
  const regextitle = /^[a-zA-ZÀ-ÿ0-9\s'.,-]{2,100}$/;
  const regeximageurl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
  const regexdescription = /^[\wÀ-ÿ\s.,'?!-]{10,500}$/;
  const regexnombrseats = /^[1-9][0-9]{0,2}$/;
  const regexprix = /^(?:\d+|\d+\.\d{1,2})$/;
  const errormsg = document.querySelector(".alert");
  const title = document.querySelector("#edit-title").value.trim();
  const imageurl = document.querySelector("#edit-image").value.trim();
  const description = document.querySelector("#edit-description").value.trim();
  const nombrseats = document.querySelector("#edit-seats").value.trim();
  const prix = document.querySelector("#edit-price").value.trim();
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
  if (!regexprix.test(prix)) {
    errormsg.classList.remove("is-hidden");
    errormsg.textContent = "prix est invalid essayer une autre fois";
    return;
  } else {
    errormsg.classList.add("is-hidden");
  }

  events[index] = {
    title: title,
    image: imageurl,
    description: description,
    nombrseats: nombrseats,
    prix: prix,
  };

  localStorage.setItem("event", JSON.stringify(events));
  listevents();
}

function detailstable(index) {
  const modal = document.querySelector(".modal__body");
  divmodal.classList.remove("is-hidden");
  events.forEach(() => {
    modal.innerHTML = `
      <h2>Title : ${events[index].title} </h2>
      <h2>Prix : ${events[index].prix} </h2>
      <h2>NombreSeats : ${events[index].nombrseats} </h2>
  `;
  });
}

function closemodal() {
  divmodal.classList.add("is-hidden");
  edit_modal.classList.add("is-hidden");
}

const archivetable = document.querySelector("#data-archive-table");
function listarchive() {
  console.log(archivetable);

  archive = JSON.parse(localStorage.getItem("arch")) || [];
  archivetable.innerHTML = "";
  archive.forEach((ar, index) => {
    archivetable.innerHTML += `
   <tr class="table__row" data-event-id="1">
                                    <td>${index + 1}</td>
                                    <td>${ar.title}</td>
                                    <td>${ar.prix}</td>
                                    <td>${ar.nombrseats}</td>
                                    <td>
                                        <button class="btn btn--small" data-action="restore" onclick="restoreevent(${index})" data-event-id="1">Restore</button>
                                    </td>
                                </tr>`;
  });
}

function restoreevent(index) {
  events.push(archive[index]);
  localStorage.setItem("event", JSON.stringify(events));
  archive.splice(index, 1);
  localStorage.setItem("arch", JSON.stringify(archive));
  listevents();
  listarchive();
}
