class Main {
   constructor(title, author, pages) {
      this.title = title;
      this.author = author;
      this.pages = pages;
   }
}

class Task {
   static showBooks() {
      const books = Storage.getBooks();
      books.forEach(book => Task.addBook(book));
   }
   static addBook(book) {
      const addList = document.querySelector("#book-add");

      const singleRow = document.createElement("tr");
      singleRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><i class="material-icons btn-delete">
      delete</i></td>`;
      addList.appendChild(singleRow);
   }
   static alert(info, className) {
      const newDiv = document.createElement("div");
      newDiv.className = `event ${className}`;
      newDiv.appendChild(document.createTextNode(info));
      const wrapper = document.querySelector(".wrapper");
      const form = document.querySelector("form");
      wrapper.insertBefore(newDiv, form);
      setTimeout(() => document.querySelector(".event").remove(), 3000);
   }
   static removeBook(item) {
      if (item.classList.contains("btn-delete")) {
         item.parentElement.parentElement.remove();
      }
   }
   static removeTask() {
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#isbn").value = "";
   }
}

class Storage {
   static getBooks() {
      let books;
      if (localStorage.getItem("test") === null) {
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem("test"));
      }
      return books;
   }

   static saveBook(book) {
      const putBook = Storage.getBooks();
      putBook.push(book);
      localStorage.setItem("test", JSON.stringify(putBook));
   }

   static deleteBook(pages) {
      const outBook = Storage.getBooks();
      outBook.forEach((item, i) => {
         if (item.pages === pages) {
            outBook.splice(i, 1);
         }
      });
      localStorage.setItem("test", JSON.stringify(outBook));
   }
}

document.addEventListener("DOMContentLoaded", Task.showBooks);

document.querySelector("#book-form").addEventListener("submit", e => {
   e.preventDefault();
   const title = document.querySelector("#title").value;
   const author = document.querySelector("#author").value;
   const pages = document.querySelector("#isbn").value;
   const re = /^\d+$/;
   if (!re.test(pages) || pages === "") {
      return Task.alert("Write numbers or fill the field", "not");
   }
   if (title === "" || author === "") {
      Task.alert("Please, fill all the blanks", "not");
   } else {
      const book = new Main(title, author, pages);
      Task.addBook(book);
      Storage.saveBook(book);
      Task.alert("Book has been added", "add");
   }
   Task.removeTask();
});
document.querySelector("#book-add").addEventListener("click", e => {
   Task.removeBook(e.target);
   Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);
});
