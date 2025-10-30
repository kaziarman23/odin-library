const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add a new book to the array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Display books in the DOM
function displayBooks() {
  const libraryDisplay = document.getElementById("libraryDisplay");
  libraryDisplay.innerHTML = ""; // clear previous display

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "✅ Read" : "❌ Not read"}</p>
      <button class="read-status">${book.read ? "Mark Unread" : "Mark Read"}</button>
      <button class="remove">Remove</button>
    `;

    // Button events
    card.querySelector(".remove").addEventListener("click", () => removeBook(book.id));
    card.querySelector(".read-status").addEventListener("click", () => toggleReadStatus(book.id));

    libraryDisplay.appendChild(card);
  });
}

// Remove book
function removeBook(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Toggle read status
function toggleReadStatus(bookId) {
  const book = myLibrary.find((b) => b.id === bookId);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Handle form + dialog
const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => bookDialog.showModal());
cancelBtn.addEventListener("click", () => bookDialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent form from refreshing the page

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  bookDialog.close();
});

// --- For testing: add a few books manually ---
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
