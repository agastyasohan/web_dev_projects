document.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.querySelector('#newBookBtn');
    const add_book = document.querySelector('#addBookDialog');
    const submitBtn = document.querySelector('#submitBtn');
    const addBookForm = document.querySelector('#addBookForm');

    newBookBtn.addEventListener('click', (e) => {
        add_book.showModal();
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addBookToLibrary();
        displayBooks();

        add_book.close();
        addBookForm.reset();
    });

    const myLibrary = [];

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    //default books to add
    let book1 = new Book("The Alchemist", "Paulo Coelho", 156, "Finished");
    let book2 = new Book("Mastery", "Robert Greene", 344, "Finsihed" );

    myLibrary.push(book1);
    myLibrary.push(book2);

    function addBookToLibrary() {
        let titleInput = document.querySelector('#title').value;
        let authorInput = document.querySelector('#author').value; 
        let pagesInput = document.querySelector('#pages').value;
        let readInput = document.querySelector('#read').checked ? "Finished" : "Not Finished";
        let newBook = new Book(titleInput, authorInput, pagesInput, readInput);
        myLibrary.push(newBook);
        console.log(myLibrary);
    }

    function displayBooks () {
        const cardsContainer = document.querySelector('.bookCards');

        // Clear library
        cardsContainer.innerHTML = '';
        
    }
});
