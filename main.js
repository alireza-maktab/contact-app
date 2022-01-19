let contacts = [];

function getData() {
  return fetch("http://localhost:3000/contacts")
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      alert("request to server failed!");
    });
}

function handleClickDelete(event) {
  const btnElem = event.target;
  const rowElem = btnElem.closest("tr");
  const contactId = rowElem.dataset.id;
  const isConfirmed = confirm(
    `Are you sure to delete contact id:"${contactId}"`
  );
  if (isConfirmed) {
    fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: "DELETE",
    }).then(() => {
      refreshList();
    });
  }
}

function createRowElementForContact(contact) {
  const trElem = document.createElement("tr");
  trElem.dataset.id = contact.id;

  const nameCellElem = document.createElement("td");
  nameCellElem.innerText = contact.firstName + " " + contact.lastName;

  const emailCellElem = document.createElement("td");
  emailCellElem.innerText = contact.email;

  const phoneCellElem = document.createElement("td");
  phoneCellElem.innerText = contact.phone;

  const genderCellElem = document.createElement("td");
  genderCellElem.innerText = contact.gender;

  const nationalityCellElem = document.createElement("td");
  nationalityCellElem.innerText = contact.nationality;

  const actionsCellElem = document.createElement("td");
  const deleteBtnElem = document.createElement("button");
  deleteBtnElem.innerText = "Delete";
  deleteBtnElem.className = "btn btn-danger";
  deleteBtnElem.type = "button";
  deleteBtnElem.addEventListener("click", handleClickDelete);
  actionsCellElem.append(deleteBtnElem);

  trElem.append(
    nameCellElem,
    emailCellElem,
    phoneCellElem,
    genderCellElem,
    nationalityCellElem,
    actionsCellElem
  );

  return trElem;
}

function refreshList() {
  getData().then((data) => {
    const contactsElements = data.map((contact, index) => {
      const row = createRowElementForContact(contact);
      const rowNumberElement = document.createElement("td");
      rowNumberElement.innerText = index + 1;
      row.prepend(rowNumberElement);
      return row;
    });
    const contactListBodyElement = document
      .getElementById("contact-list")
      .querySelector("tbody");
    contactListBodyElement.innerHTML = "";
    contactListBodyElement.append(...contactsElements);
  });
}

refreshList();
