document.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.querySelector('#newBookBtn');
    const add_book = document.querySelector('#addBookDialog');
    const submitBtn = document.querySelector('#submitBtn');
    const addBookForm = document.querySelector('#addBookForm');

    newBookBtn.addEventListener('click', (e) => {
        add_book.showModal();
    });

    closeBtn.addEventListener('click', (e) =>{
        add_book.close();
        addBookForm.reset();
    })

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Check if the form is valid
        if(addBookForm.checkValidity()){
            addBookToLibrary();
            displayBooks();

            add_book.close();
            addBookForm.reset();
        } else {
            // Trigger browser's default validation UI
            addBookForm.reportValidity();
        }

        
    });

    const myLibrary = [];

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.toggleReadStatus = function() {
        this.read = (this.read === "Finished" ? "Not Finished" : "Finished" );
    }

    //default books to add
    let book1 = new Book("The Alchemist", "Paulo Coelho", 156, "Finished");
    let book2 = new Book("Mastery", "Robert Greene", 344, "Finished" );

    myLibrary.push(book1);
    myLibrary.push(book2);

    displayBooks();

    function addBookToLibrary() {
        let titleInput = document.querySelector('#title').value;
        let authorInput = document.querySelector('#author').value; 
        let pagesInput = document.querySelector('#pages').value;
        let readInput = document.querySelector('#read').checked ? "Finished" : "Not Finished";
        let newBook = new Book(titleInput, authorInput, pagesInput, readInput);
        myLibrary.push(newBook);
        console.log(myLibrary);
    }

    const removeBook = (index) => {
        myLibrary.splice(index, 1);
        displayBooks(); // Refresh the book display
    }

    function displayBooks () {
        const cardsContainer = document.querySelector('.bookCards');

        // Clear all existing book cards from the container Preventing duplicates
        cardsContainer.innerHTML = '';

        myLibrary.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('bookCard');
            bookCard.setAttribute('data-id',index);

            // adding book title
            const bookTitle = document.createElement('h3');
            bookTitle.textContent = book.title;
            bookCard.appendChild(bookTitle);

            const line = document.createElement('hr');
            bookCard.appendChild(line);

            //author
            const authorDiv = document.createElement('div');
            authorDiv.classList.add('authorDiv');
            const bookAuthor = document.createElement('p');
            bookAuthor.textContent = `by ${book.author}`;
            authorDiv.appendChild(bookAuthor);
            bookCard.appendChild(authorDiv);

            // pages and read
            const pagesAndReadDiv = document.createElement('div');
            pagesAndReadDiv.classList.add('pagesAndRead');
            pagesAndReadDiv.style.display = 'flex';
            pagesAndReadDiv.style.justifyContent = 'space-between';

            const bookPages = document.createElement('p');
            bookPages.textContent = `${book.pages} pages`;
            pagesAndReadDiv.appendChild(bookPages);

            const dot = document.createElement('p');
            dot.textContent = "•";
            pagesAndReadDiv.appendChild(dot);

            const bookRead = document.createElement('p');
            bookRead.textContent = book.read;
            pagesAndReadDiv.appendChild(bookRead);

            bookCard.appendChild(pagesAndReadDiv);

            //buttons
            const btnDiv = document.createElement('div');
            btnDiv.classList.add('btnDiv');
            btnDiv.style.display = 'flex';
            btnDiv.style.justifyContent = 'space-between';
            
            // Create a button to toggle the read status of the book
            const statusBtn = document.createElement('button');

            // Add click event listener to change the book's read status
            statusBtn.addEventListener('click', ()=> {
                book.toggleReadStatus();

                // Refresh the display to show the updated status
                // This re-renders all books, ensuring the UI is in sync with the data
                displayBooks();
            })


            statusBtn.textContent = "change status";
            statusBtn.style.padding = '5px 10px';
            statusBtn.style.backgroundColor = 'black';
            statusBtn.style.color = 'white';
            statusBtn.style.borderRadius = '5px';
            btnDiv.appendChild(statusBtn);


            // Create a remove button for this book card
            const removeBtn = document.createElement('button');

            // Add click event listener to remove the book
            // This uses the data-id attribute to identify which book to remove
            removeBtn.addEventListener('click', (e)=>{

                // Find the closest ancestor element with class 'bookCard'
                // This gets us the entire card div, not just the button
                const clickedBookCard = e.target.closest('.bookCard');

                // Retrieve the book's index from the data-id attribute
                // This index corresponds to the book's position in myLibrary array
                const bookIndex = clickedBookCard.dataset.id;

                removeBook(parseInt(bookIndex));  // parseInt is used because dataset values are always strings
            })

            removeBtn.textContent = "Remove";
            removeBtn.style.padding = '5px 10px';
            removeBtn.style.backgroundColor = 'black';
            removeBtn.style.color = 'white';
            removeBtn.style.borderRadius = '5px';

            btnDiv.appendChild(removeBtn);

            bookCard.appendChild(btnDiv);

            //bookCard div style
            bookCard.style.backgroundColor = "white";
            bookCard.style.padding = '30px';
            bookCard.style.margin = '10px';
            bookCard.style.borderRadius = '5px';
            bookCard.style.display = 'flex';
            bookCard.style.flexDirection = 'column';
            bookCard.style.justifyContent = 'space-around';
            bookCard.style.gap = '10px';

            cardsContainer.appendChild(bookCard);
        });
        
    };
});
