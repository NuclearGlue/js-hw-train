import book from './books.js'

const root = document.querySelector('#root');

const firstDiv = document.createElement('div');
firstDiv.classList.add('div1');
const secondDiv = document.createElement('div');
secondDiv.classList.add('div2');
const header = document.createElement('h1');
const list = document.createElement('ul');
list.classList.add('list');
const text = document.createElement('p');
const button = document.createElement('button');

button.textContent = 'Add book';
header.textContent = 'Our Books';

root.append(firstDiv, secondDiv);
firstDiv.append(header, list, button);
const renderItem = document.querySelector('.div2');
const listElem = document.querySelector('.list')
localStorage.setItem('books', JSON.stringify(book));

function renderList() {
  const bookItem = JSON.parse(localStorage.getItem("books"));
  listElem.insertAdjacentHTML(
    "afterbegin",
    bookItem
      .map(
        (elem) => `<li id ="${elem.id}">
          <p class = "description">${elem.title}</p>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </li>`
      )
      .join("")
  );
  const discription = document.querySelectorAll("p");
  const btnEdit = document.querySelectorAll(".edit");
  const btnDel = document.querySelectorAll(".delete");

  discription.forEach((elem) => elem.addEventListener("click", renderPrev));
  btnEdit.forEach((elem) => elem.addEventListener("click", editBook));
  btnDel.forEach((elem) => elem.addEventListener("click", deletBook));
}


function renderPrev(event) {

  const textDesc = event.currentTarget.textContent;
const bookItem = JSON.parse(localStorage.getItem("books"));

  const currentBook = bookItem.find(elem => elem.title === textDesc);
  renderItem.innerHTML = `<h2>${currentBook.title}</h2>
 <h3>${currentBook.author}</h3>
  <img class = "book-image" src = ${currentBook.img}>
 <p>${currentBook.plot}</p>`;
  
}

function editBook() {
  console.log("editBook");
}

function deletBook(event) {
  const elemId = event.currentTarget.parentNode.id;

  const bookItem = JSON.parse(localStorage.getItem("books"));
  const newList = bookItem.filter((element) => element.id !== elemId)
  localStorage.setItem('books', JSON.stringify(newList));
  list.innerHTML = '';
  secondDiv.innerHTML = '';
  renderList();
}
renderList();

