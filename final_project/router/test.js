async function getAllBooks() {
  try {
    const response = await fetch('/');
    const books = await response.json();
    console.log('All books:', books);
    return books;
  } catch (error) {
    console.error(error);
  }
}

function searchBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    fetch(`/isbn/${isbn}`)
      .then((response) => response.json())
      .then((books) => {
        const book = Object.values(books).find((book) => book[isbn]);
        if (book) {
          resolve(book);
        } else {
          reject(`Book with ISBN ${isbn} not found`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function searchBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    fetch(`/author/${author}`)
      .then((response) => response.json())
      .then((books) => {
        const filteredBooks = Object.values(books).filter((book) => book.author === author);
        if (filteredBooks.length > 0) {
          resolve(filteredBooks);
        } else {
          reject(`No books found for author ${author}`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function searchBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    fetch(`/title/${title}`)
      .then((response) => response.json())
      .then((books) => {
        const filteredBooks = Object.values(books).filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
        if (filteredBooks.length > 0) {
          resolve(filteredBooks);
        } else {
          reject(`No books found with title '${title}'`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


