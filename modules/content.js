/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

const listOfbooks = document.querySelector('.book-list');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookid = Math.random().toFixed(1);
  }
}

class StoreBook {
  constructor() {
    this.BookData = [];
  }

  // Adding new book
  addBook = (newbook) => {
    this.BookData.push(newbook);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
    DisplayBooks(newbook);
  }

  // Removing book from the list
  removeBook = (bookid) => {
    const rmvbook = document.getElementById(bookid);
    rmvbook.remove();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
  }
}

const savebook = new StoreBook();
// Get input value
const getformInput = () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Display the list of books on the web page
let DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = 'dark';
  } else {
    bgcolor = 'light';
  }
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.classList.add(bgcolor);
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p>${index.title} by ${index.author}</p>`;
  const removeBook = document.createElement('button');
  removeBook.classList.add('remove');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  listOfbooks.appendChild(displaybook);
};

// Add Button
const addnewBook = document.querySelector('.add-btn');
addnewBook.addEventListener('click', () => {
  const item = getformInput();
  savebook.addBook(item);
  success();
});

const success = () => {
  const div = document.createElement('div');
  div.className = 'success';
  div.appendChild(document.createTextNode('Book successfully added!'));
  const newB = document.querySelector('.form-title');
  newB.appendChild(div);
};

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('AllBooks' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};
