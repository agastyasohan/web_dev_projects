# Library Project

## Live Preview

Check out the live preview of the Library App:

# [Library App](https://agastyasohan.github.io/web_dev_projects/library_app)

## Overview

This project is a simple library application built to practice and demonstrate the usage of objects, object constructors, and prototypes in JavaScript. The application allows users to add books to their library, display them on the page, and interact with them by changing their read status and removing them from the library.

## Features

- **Add New Book**: Users can add new books to the library by filling out a form. Each book has a title, author, number of pages, and a read status.
- **Display Books**: Books are displayed on the page in a card format, showing their title, author, pages, and read status.
- **Toggle Read Status**: Each book card has a button to toggle its read status between "Finished" and "Not Finished".
- **Remove Book**: Each book card has a button to remove the book from the library.

## Technologies Used

- HTML
- CSS
- JavaScript

## Project Structure

- **index.html**: The main HTML file that contains the structure of the application.
- **style.css**: The CSS file that styles the application.
- **app.js**: The JavaScript file that contains the logic of the application.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/library-project.git
    ```
2. **Navigate to the project directory**:
    ```sh
    cd library-project
    ```
3. **Open index.html in your browser**:
    ```sh
    open index.html
    ```

## Code Explanation

### Book Constructor and Prototype

The `Book` constructor is used to create new book objects. Each book has a title, author, number of pages, and a read status.

```javascript
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === "Finished" ? "Not Finished" : "Finished";
};

//default books to add
let book1 = new Book("The Alchemist", "Paulo Coelho", 156, "Finished");
let book2 = new Book("Mastery", "Robert Greene", 344, "Finished" );

myLibrary.push(book1);
myLibrary.push(book2);

displayBooks();
```
