const alert = document.querySelector(".alert");
const form = document.querySelector(".form");
const container = document.querySelector(".container");
const input = document.querySelector("#form");
const listItem = document.querySelector(".todo-list");
const containerList = document.querySelector(".container-list");
const clearButton = document.querySelector(".btn-clear");
const submitButton = document.querySelector(".btn-submit");

let editElement;
let editFlag = false;
let editId = "";

// add eventlistener
window.addEventListener("DOMContentLoaded", setupItem);

form.addEventListener("submit", addItem);
clearButton.addEventListener("click", clearItems);

function addItem(e) {
  e.preventDefault();
  let id = new Date().getTime().toString();
  const inputValue = input.value;

  if (inputValue && !editFlag) {
    // add to the list
    // console.log(inputValue);
    createListELement(id, inputValue);
    // const element = document.createElement("article");
    // element.classList.add("todo-list");
    // const createAttr = document.createAttribute("data-id");
    // createAttr.value = id;
    // element.setAttributeNode(createAttr);
    // element.innerHTML = ` <h5>${inputValue}</h5>
    //         <article class="btn-group">
    //           <button type="button" class="btn-edit">
    //             <i class="fa-solid fa-edit"></i>
    //           </button>
    //           <button type="button" class="btn-trash">
    //             <i class="fa-solid fa-trash-alt"></i>
    //           </button>
    //         </article> `;

    // // delete item

    // const trashButton = element.querySelector(".btn-trash");
    // const editButton = element.querySelector(".btn-edit");
    // trashButton.addEventListener("click", deleteItem);
    // editButton.addEventListener("click", editItem);

    // containerList.appendChild(element);
    displayAlert("item Added", "success");
    container.classList.add("show-container");

    addToLocalStorage(id, inputValue);

    setBackToDefault();
  } else if (inputValue && editFlag) {
    // edit to the list
    editElement.innerHTML = input.value;
    // console.log(
    //   "🚀 ~ file: script.js ~ line 59 ~ addItem ~ editElement.innerHTML",
    //   editElement.innerHTML
    // );
    editLocalStorage(editId, input.value);
    displayAlert("edit item", "success");
    setBackToDefault();
  } else {
    // not enter value
    displayAlert("Empty item", "success");
  }
}

function clearItems() {
  const items = document.querySelectorAll(".todo-list");
  if (items.length > 0) {
    items.forEach(function (item) {
      containerList.removeChild(item);
    });
    displayAlert("all items removed", "danger");
    container.classList.remove("show-container");
  }

  localStorage.removeItem("list");
}

// delete Item

function deleteItem(e) {
  // console.log("click delete");
  const deleteListItem = e.currentTarget.parentElement.parentElement;
  // console.log(
  //   "🚀 ~ file: script.js ~ line 87 ~ deleteItem ~ deleteListItem",
  //   deleteListItem
  // );
  const id = deleteListItem.dataset.id;

  // console.log(
  //   "🚀 ~ file: script.js ~ line 79 ~ deleteItem ~ deleteListItem",
  //   deleteListItem
  // );
  containerList.removeChild(deleteListItem);
  if (containerList.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "success");
  setBackToDefault();
  removeLocalStorage(id);
}
// edit Item

function editItem(e) {
  // console.log("click edit");
  const editListItem = e.currentTarget.parentElement.parentElement;

  editElement = e.currentTarget.parentElement.previousElementSibling;
  // console.log(
  //   "🚀 ~ file: script.js ~ line 104 ~ editItem ~ editElement",
  //   editElement
  // );

  input.value = editElement.innerHTML;
  // console.log(
  //   "🚀 ~ file: script.js ~ line 110 ~ editItem ~ input.value",
  //   input.value
  // );
  editFlag = true;
  editId = editListItem.dataset.id;
  // console.log("🚀 ~ file: script.js ~ line 116 ~ editItem ~ editId", editId);
  submitButton.textContent = "edit";
}

function displayAlert(text, selector) {
  alert.textContent = text;
  alert.classList.add(`alert-${selector}`);
  setTimeout(function () {
    alert.textContent = ``;
    alert.classList.remove(`alert-${selector}`);
  }, 1000);
}

function addToLocalStorage(id, value) {
  let task = {
    id: id,
    value: value,
  };

  let items = getLocalStorage();
  items.push(task);
  localStorage.setItem("list", JSON.stringify(items));
}

function setBackToDefault() {
  // console.log(`setBack`);
  input.value = "";
  editFlag = false;
  editId = "";
  submitButton.textContent = "submit";
}

function removeLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(editId, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === editId) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// localStorage.setItem("task", JSON.stringify("HELLO"));
// let orange = JSON.parse(localStorage.getItem("task"));
// console.log("🚀 ~ file: script.js ~ line 149 ~ orange", orange);

// localStorage.removeItem("task");

function setupItem() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListELement(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListELement(id, value) {
  const element = document.createElement("article");
  element.classList.add("todo-list");
  const createAttr = document.createAttribute("data-id");
  createAttr.value = id;
  element.setAttributeNode(createAttr);
  element.innerHTML = ` <h5>${value}</h5>
            <article class="btn-group">
              <button type="button" class="btn-edit">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button type="button" class="btn-trash">
                <i class="fa-solid fa-trash-alt"></i>
              </button>
            </article> `;

  // delete item

  const trashButton = element.querySelector(".btn-trash");
  const editButton = element.querySelector(".btn-edit");
  trashButton.addEventListener("click", deleteItem);
  editButton.addEventListener("click", editItem);

  containerList.appendChild(element);
}
