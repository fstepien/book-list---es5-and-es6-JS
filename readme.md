Book List
=========

* HTML/Skeleton
* JavaScript
  1. ES5 - app.js
  2. ES6 - app.es6.js
  3. ES6 - app.es6.ls.js local storage feature

##### From:

```JavaScript
function Book(title, author, isbn) {
}
function UI() {}
UI.prototype.addBookToList = function(book){
}
UI.prototype.showAlert = function(message, className) {
}
UI.prototype.deleteBook = function(target) {
  }
}
UI.prototype.clearFields = function() {
}
```
##### To:

```JavaScript
class Book {
  constructor(title, author, isbn){
  }
}

class UI {
  addBookToList(book){
  }
  showAlert(message, className){
  }
  deleteBook(target){
  }
  clearFields(){
}  
```
