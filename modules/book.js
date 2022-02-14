export default class Book {
  static counter = 0;

  constructor(title, author) {
    this.title = title;
    this.author = author;
    Book.counter += 1;
    this.id = Book.counter;
  }
}
