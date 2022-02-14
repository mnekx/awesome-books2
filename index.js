/* eslint-disable max-classes-per-file */

import Book from './modules/book.js';
import BookCollection from './modules/books_collection.js';
import { friendlyDateTime } from './node_modules/luxon/src/datetime.js';

let navLinks = document.querySelectorAll('.nav-link');
let contentSections = document.querySelectorAll('.content');
const addBookBtn = document.querySelector('#add-book');
const addBookForm = document.querySelector('#add-book-form');

navLinks = Array.from(navLinks);
contentSections = Array.from(contentSections);
navLinks.forEach((link, key) => {
  link.classList.remove('active');
  contentSections.forEach((section) => {
    section.classList.remove('content-show');
    // section.classList.add('content-hide')
  });
  switch (key) {
    case 0: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach((l) => {
          l.classList.remove('active');
        });
        link.classList.add('active');

        const selectedSection = document.querySelector('#main-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    case 1: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach((l) => {
          l.classList.remove('active');
        });
        link.classList.add('active');
        const selectedSection = document.querySelector('#new-book-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    case 2: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach((l) => {
          l.classList.remove('active');
        });
        link.classList.add('active');
        const selectedSection = document.querySelector('#contact-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    default:
      break;
  }
});

const books = new BookCollection();

// Local Storage

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem('books')) {
    books.populateStorage();
  } else {
    books.setInputs();
  }
}
books.setInputs();
books.renderList();

addBookForm.addEventListener('submit', (e) => e.preventDefault());

addBookBtn.addEventListener('click', () => {
  const author = document.querySelector('#author');
  const title = document.querySelector('#title');
  const book = new Book(title.value, author.value);
  books.add(book);
  books.renderList();
  books.populateStorage();
  title.value = '';
  author.value = '';
});

const todayDate = document.querySelector('#date');
setInterval(() => {
  todayDate.innerHTML = friendlyDateTime(new Date());
}, 1000);
