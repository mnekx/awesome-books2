import Book from './book.js';

const mainSection = document.querySelector('#main-section');
let bookList = document.querySelector('#book-list');
let removebtns = document.querySelectorAll('.btn-remove');

export default class BookCollection {
  constructor() {
    this.collection = [];
    this.book = new Book('', '');
  }

  add(book) {
    this.collection.push(book);
  }

  remove(id) {
    this.collection = this.collection.filter(
      (book) => book.id !== parseInt(id, 10),
    );
  }

  setBooks(collection) {
    this.collection = collection;
    Book.counter = collection.length;
  }

  getBooks() {
    return this.collection;
  }

  renderList() {
    if (this.collection.length === 0) {
      const pEmpty = document.createElement('p');
      pEmpty.innerText = 'List is Empty!';
      pEmpty.id = 'p-empty';
      mainSection.appendChild(pEmpty);

      if (bookList) {
        bookList.classList.remove('d-block');
        bookList.classList.add('d-none');
      }
    } else {
      const pEmpty = document.querySelector('#p-empty');
      if (pEmpty) {
        mainSection.removeChild(pEmpty);
      }
      if (!bookList) {
        bookList = document.createElement('ul');
      }
      bookList.classList.add('d-block');
      bookList.classList.remove('d-none');
      bookList.id = 'book-list';
      mainSection.appendChild(bookList);
      bookList.innerHTML = '';
      this.collection.forEach((book) => {
        bookList.innerHTML += `<li id="book-li-${book.id}" class="d-flex item">
                  <span>"${book.title}" by "${book.author}"</span>
                  <button id="remove-btn-${book.id}" class="btn btn-danger btn-remove">Remove</button>
                </li>`;
      });
      // Add event listeners for removal buttons
      removebtns = document.querySelectorAll('.btn-remove');
      this.addRemoveListerners(removebtns);
    }
  }

  addRemoveListerners(removebtns) {
    removebtns = Array.from(removebtns);
    removebtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const bookId = parseInt(btn.id.split('').splice(-1)[0], 10);
        this.remove(bookId);
        const liToremove = document.querySelector(`#book-li-${bookId}`);
        liToremove.classList.add('item-remove');
        // liToremove.classList.remove('d-flex');
        setTimeout(() => {
          liToremove.remove();
        }, 1000);
        if (this.collection.length === 0) {
          this.renderList();
        }
        this.populateStorage();
      });
    });
  }

  populateStorage() {
    localStorage.setItem('books', JSON.stringify(this.getBooks()));
    // setInputs();
  }

  setInputs() {
    const booksArr = JSON.parse(localStorage.getItem('books'));
    this.setBooks(booksArr);
  }
}
