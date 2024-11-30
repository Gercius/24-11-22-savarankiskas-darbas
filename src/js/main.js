import { inventory } from "./data.js";

listBooks();
calculateInventoryValue();

function listBooks() {
    inventory.forEach((category) => {
        const bookGroup = category.books;
        bookGroup.forEach((book) => {
            // console.log(book.publishing_year === 2021 ? book.title + " - New book" : book.title);
        });
    });
}

function calculateInventoryValue() {
    let totalValue = 0;

    inventory.forEach((category) => {
        const bookGroup = category.books;

        let bookCategoryValue = 0;
        bookGroup.forEach((book) => {
            bookCategoryValue += book.quantity * book.price;
        });
        // console.log(`Overall value of category ${category.category}: ${bookCategoryValue}`);

        totalValue += bookCategoryValue;
    });
    // console.log("Overall inventory value:", totalValue);
}
