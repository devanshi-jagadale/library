const myLibrary = [];

function Book(title, author, pages, status, url,about) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.about =about;
  this.status = status;  // 'To Read', 'Currently Reading', 'Finished Reading'
  this.url = url;
}

Book.prototype.toggleStatus = function () {
  if (this.status === "To Read") {
    this.status = "Currently Reading";
  } else if (this.status === "Currently Reading") {
    this.status = "Finished Reading";
  } else {
    this.status = "To Read";
  }
};

function addBookToLibrary(title, author, pages, status, url,about) {
  const newBook = new Book(title, author, pages, status, url,about);
  myLibrary.push(newBook);
  displayBooks();
}

addBookToLibrary("1984", "George Orwell", 328, "Finished Reading", "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b468d093312907.5e6139cf2ab03.png","1984, first published in 1948, is based on a dystopian vision of the future where the freedom of the individual is subjugated to the conformity of society. The novel focuses on Winston Smith, who works for the Ministry of Truth, a branch of the government responsible for the dissemination of information.");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Currently Reading", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVgfBiC6GYanCvH5V_qAlkxNjBTc5KJOU4fQ&s","The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the titular hobbit who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company on a quest to reclaim the dwarves' home and treasure from the dragon Smaug.");

function displayBooks() {
  const ToRead = document.getElementById("to-read-books");
  const reading = document.getElementById("currently-reading-books");
  const finished = document.getElementById("finished-reading-books");

  // Clear containers
  ToRead.innerHTML = "";
  reading.innerHTML = "";
  finished.innerHTML = "";

  // Track if any books are added
  let toReadCount = 0;
  let readingCount = 0;
  let finishedCount = 0;

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;

    const hoverWrapper = document.createElement("div");
    const img = document.createElement("img");
    img.src = book.url;
    img.alt = "Book cover";
    img.style.maxWidth = "100%";

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.innerHTML = `
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p id="about"><strong>About:</strong> ${book.about}</p>
    `;
    bookInfo.style.display = "none";

    hoverWrapper.appendChild(img);
    hoverWrapper.appendChild(bookInfo);

    hoverWrapper.addEventListener("mouseover", () => {
      bookInfo.style.display = "block";
    });
    hoverWrapper.addEventListener("mouseout", () => {
      bookInfo.style.display = "none";
    });

    const title = document.createElement("h3");
    title.textContent = book.title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.id);
    });

    const toggleStatusBtn = document.createElement("button");
    toggleStatusBtn.textContent = "Change Status";
    toggleStatusBtn.addEventListener("click", () => {
      book.toggleStatus();
      displayBooks();
    });

    bookCard.appendChild(hoverWrapper);
    bookCard.appendChild(title);
    bookCard.appendChild(toggleStatusBtn);
    bookCard.appendChild(removeBtn);

    if (book.status === "To Read") {
      ToRead.appendChild(bookCard);
      toReadCount++;
    } else if (book.status === "Currently Reading") {
      reading.appendChild(bookCard);
      readingCount++;
    } else {
      finished.appendChild(bookCard);
      finishedCount++;
    }
  });

  // If no books in To Read section, show message
  if (toReadCount === 0) {
    const noBooksMsg = document.createElement("p");

    noBooksMsg.textContent = "No books to display";
    noBooksMsg.style.fontStyle = "italic";
    noBooksMsg.style.color = "#333";
    noBooksMsg.style.fontWeight="bold";
    noBooksMsg.style.fontSize="20px";
    noBooksMsg.style.marginTop="0px";
    noBooksMsg.style.padding="10px";
    noBooksMsg.style.backgroundColor="#9f9f9f";
    noBooksMsg.style.borderRadius="50px";
    ToRead.appendChild(noBooksMsg);
  }

  // If no books in Currently Reading section, show message
  if (readingCount === 0) {
    const noBooksMsg = document.createElement("p");
    noBooksMsg.textContent = "No books to display";
    noBooksMsg.style.fontStyle = "italic";
    noBooksMsg.style.color = "#333";
    noBooksMsg.style.fontWeight="bold";
    noBooksMsg.style.fontSize="20px";
    noBooksMsg.style.marginTop="0px";
    reading.appendChild(noBooksMsg);
  }

  // If no books in Finished Reading section, show message
  if (finishedCount === 0) {
    const noBooksMsg = document.createElement("p");
    noBooksMsg.textContent = "No books to display";
    noBooksMsg.style.fontStyle = "italic";
    noBooksMsg.style.color = "#333";
    noBooksMsg.style.fontWeight="bold";
    noBooksMsg.style.fontSize="20px";
    noBooksMsg.style.marginTop="0px";
    finished.appendChild(noBooksMsg);
  }
}

function removeBookFromLibrary(bookId) {
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

const newBook = document.querySelector("#new-book");
const dialog = document.querySelector("#book-dialog");

newBook.addEventListener("click", () => {
  dialog.innerHTML = "";
  const form = document.createElement("form");
  form.method = "dialog";

  const titleInput = document.createElement("input");
  titleInput.name = "title";
  titleInput.type = "text";
  titleInput.placeholder = "Book Title";
  titleInput.required = true;

  const authorInput = document.createElement("input");
  authorInput.name = "author";
  authorInput.type = "text";
  authorInput.placeholder = "Book Author";
  authorInput.required = true;

  const pagesInput = document.createElement("input");
  pagesInput.name = "pages";
  pagesInput.type = "number";
  pagesInput.placeholder = "Number of pages";
  pagesInput.required = true;

  const urlInput = document.createElement("input");
  urlInput.name = "url";
  urlInput.type = "text";
  urlInput.placeholder = "Cover Image URL";
  urlInput.required = true;

  const statusSelect = document.createElement("select");
  statusSelect.name = "status";
  ["To Read", "Currently Reading", "Finished Reading"].forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status.replace(/([A-Z])/g, " $1");
    statusSelect.appendChild(option);
  });

  const aboutInput = document.createElement("input");
  aboutInput.name = "about";
  aboutInput.type = "text";
  aboutInput.placeholder = "A little bit about the book";
  aboutInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Book";

  const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => {
    dialog.close();
    });

  const title = document.createElement("p");
  title.classList.add("ipques");
  title.textContent = "What's the title?";
  form.appendChild(title);
  form.appendChild(titleInput);
  form.appendChild(document.createElement("br"));

  const author = document.createElement("p");
  author.classList.add("ipques");
  author.textContent = "Who's the author?";
  form.appendChild(author);
  form.appendChild(authorInput);
  form.appendChild(document.createElement("br"));

  const pages = document.createElement("p");
  pages.textContent = "How many pages does the book have?";
  pages.classList.add("ipques");
  form.appendChild(pages);
  form.appendChild(pagesInput);
  form.appendChild(document.createElement("br"));

  const status = document.createElement("p");
  pages.classList.add("ipques");
  status.textContent = "Are you -about to read the book, currently reading it or are you done?";
  form.appendChild(status);
  form.appendChild(statusSelect);
  form.appendChild(document.createElement("br"));

  const url = document.createElement("p");
  url.classList.add("ipques");
  url.textContent = "Provide a link to the cover page";
  form.appendChild(url);
  form.appendChild(urlInput);
  form.appendChild(document.createElement("br"));

  form.appendChild(submitBtn);
    form.appendChild(closeBtn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value, 10);
    const status = statusSelect.value;
    const url = urlInput.value;
    addBookToLibrary(title, author, pages, status, url);
    dialog.close();
  });

  dialog.appendChild(form);
  dialog.showModal();
});
