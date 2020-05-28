//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI Class: handles UI Tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: "Book one",
                author: "author one",
                isbn: "first"
            },
            {
                title: "Book two",
                author: "author two",
                isbn: "Second"
            }
        ];

        const Books = storedBooks;
        Books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    // Getting values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //checking
    if (title == '' || author == '' || isbn == '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {
        const book = new Book(title, author, isbn);

        UI.addBookToList(book); 
        UI.showAlert('Book Added', 'success');

        UI.clearFields();
    }
});

//Event: Remove a Book.
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);   
    UI.showAlert('Book Removed', 'success'); 
});