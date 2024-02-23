const myLibrary = [];

function Book(titel, author, pages, read) {
    (this.titel = titel),
        (this.author = author),
        (this.pages = pages),
        (this.read = read);
}

function addBooksToLibrary() {
    let title = document.querySelector("#form-title").value;
    let author = document.querySelector("#form-author").value;
    let pages = document.querySelector("#form-pages").value;
    let read = document.querySelector("#form-read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    render();
}

document
    .querySelector(".Books-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        addBooksToLibrary();
    });

const newBookBtn = document.querySelector("#Add-New-Books");
newBookBtn.addEventListener("click", function () {
    const formBtn = document.querySelector(".Books-form");
    formBtn.style.display = "block";
});

function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = ""; // Clear previous content
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book-card");
        bookEl.innerHTML = `
        <div class = "card-header">
            <h1 class = "titel">${book.titel}</h1>
            <h3 class = "author">By ${book.author}</h3>
        </div>
        <div class="card-body">
            <p>pages:${book.pages}</p>
            <p class="read-status">${book.read ? "read" : "Not read Yet"}</p>
            <button class="remove-btn" onclick ="removeBook(${i})">Remove</button>
        </div>`;
        libraryEl.appendChild(bookEl);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}
