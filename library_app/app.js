
document.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.querySelector('#newBookBtn');
    const add_book = document.querySelector('#addBookDialog');
    const submitBtn = document.querySelector('#submitBtn');
    const addBookForm = document.querySelector('addBookForm');
    const bookCards = document.querySelector('.bookCards');

    newBookBtn.addEventListener('click', (e) => {
        add_book.showModal();
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').vlaue;
        const pages = document.querySelector('#pages').value;
        const read = document.querySelector('#read').checked? "Finished" : "Not Finished";

        const bookCard = document.createElement('div');

        bookCard.classList.add('bookCard');

        bookCard.innerHTML = `
        <h3> ${title} </h3>
        <div> </div>
        <p> by ${author} </p>
        <p> ${pages} Pages </p>
        <p> ${read} </p>
        <button> Change status </button>
        <button> Remove </button>
        `

        bookCards.appendChild(bookCard);

        add_book.close();
        addBookForm.reset();
    });

})


