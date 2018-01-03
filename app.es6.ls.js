class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<th>${book.title}</th>
                    <th>${book.author}</th>
                    <th>${book.isbn}</th>
                    <th><a href"#"><i class="fa fa-times delete" aria-hidden="true"></i></a></th>`;
    list.appendChild(row);
  } 
  
  showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(`${message}`));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form);
    setTimeout(function(){
      document.querySelector('.alert').remove();
        }, 3000);
  }
  deleteBook(target){
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}  

//Local Storage Class

class Store {
static getBooks(){
      let books;
      if(localStorage.getItem('books') === null ){
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
static displayBooks(){
      const books = Store.getBooks();
      books.forEach( function(book){
        const ui = new UI;
        ui.addBookToList(book);
      });
    }
static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
    }
}
// DOM Load from local storage

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//EVENT Listener

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  const book = new Book(title, author, isbn);
    

  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill all fields', 'error')
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.clearFields();
    ui.showAlert('Your book has been added', 'success');
  }

  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed!', 'success')
  e.preventDefault();
});