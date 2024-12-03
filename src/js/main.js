import { inventory as data } from "./data.js";

(function main() {
    renderBooks(data);
    renderCategories();
    searchBooks();
    filterByCategory();
})();

function renderBooks(data) {
    const booksEl = document.querySelector(".books");
    booksEl.innerHTML = "";

    data.forEach((category) => {
        const bookGroup = category.books;
        bookGroup.forEach((book) => {
            const bookCard = createBookComponent(book);
            booksEl.innerHTML += bookCard;
        });
    });

    function createBookComponent(bookInfo) {
        return `
        <article class="book-card"">
            <h3 class="title">${bookInfo.title}</h3>
            <p class="year">Publishing Year: ${bookInfo.publishing_year}</p>
            <p class="pages">Pages: ${bookInfo.pages}</p>
            <p class="price">Price: ${bookInfo.price}</p>
            <p class="quantity">Quantity: ${bookInfo.quantity}</p>
            <p class="isbn">ISBN: ${bookInfo.ISBN}</p>
        </article>
    `;
    }
}

function renderCategories() {
    const categoryListEl = document.querySelector(".categories");
    const categories = getCategories();

    categories.forEach((category) => {
        const optionEl = document.createElement("option");
        optionEl.textContent = category;
        optionEl.value = category;
        categoryListEl.appendChild(optionEl);
    });

    function getCategories() {
        const uniqueCategories = new Set();
        data.forEach((category) => {
            uniqueCategories.add(category.category);
        });

        return Array.from(uniqueCategories).sort();
    }
}

function searchBooks() {
    const searchEl = document.querySelector('[name="search"]');

    searchEl.addEventListener("input", (e) => {
        const input = e.target.value.toLowerCase();
        const bookList = document.querySelectorAll(".book-card .title");
        bookList.forEach((bookTitleEl) => {
            const bookTitle = bookTitleEl.innerHTML.toLowerCase();
            const bookFound = bookTitle.includes(input);
            bookTitleEl.parentElement.classList.toggle("hidden", !bookFound);
        });
    });
}

function filterByCategory() {
    const selectCategoriesEl = document.querySelector(".categories");

    selectCategoriesEl.addEventListener("change", (e) => {
        const selectValue = e.target.value;

        if (selectValue === "show-all") {
            renderBooks(data);
            return;
        }

        const currentCategory = data.filter((category) => category.category === selectValue);
        renderBooks(currentCategory);
    });
}
