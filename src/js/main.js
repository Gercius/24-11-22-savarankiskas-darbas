import { inventory } from "./data.js";

(function main() {
    renderBooks();
    renderCategories();
    searchBooks();
    filterByCategory();
})();

function renderBooks() {
    const booksEl = document.querySelector(".books");

    inventory.forEach((category) => {
        const bookGroup = category.books;
        bookGroup.forEach((book) => {
            const bookCard = createBookComponent(book, category.category.toLowerCase());
            booksEl.innerHTML += bookCard;
        });
    });

    function createBookComponent(bookInfo, category) {
        return `
        <article class="book-card" data-category="${category}">
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
        optionEl.value = category.toLowerCase();
        categoryListEl.appendChild(optionEl);
    });

    function getCategories() {
        const uniqueCategories = new Set();
        inventory.forEach((category) => {
            uniqueCategories.add(category.category);
        });
        return uniqueCategories;
    }
}

function searchBooks() {
    const searchEl = document.querySelector('[name="search"]');
    const bookList = document.querySelectorAll(".book-card .title");

    searchEl.addEventListener("input", (e) => {
        bookList.forEach((bookTitleEl) => {
            const bookTitle = bookTitleEl.innerHTML.toLowerCase();
            const input = e.target.value.toLowerCase();
            const bookFound = bookTitle.includes(input);
            bookTitleEl.parentElement.classList.toggle("hidden", !bookFound);
        });
    });
}

function filterByCategory() {
    const selectCategoriesEl = document.querySelector(".categories");
    const booksEl = document.querySelectorAll(".book-card");

    selectCategoriesEl.addEventListener("change", (e) => {
        const selectValue = e.target.value;

        if (selectValue === "show-all") {
            booksEl.forEach((bookCard) => {
                bookCard.classList.remove("hidden");
            });
            return;
        }

        booksEl.forEach((bookCard) => {
            const bookCategory = bookCard.dataset.category;
            const currentSelection = bookCategory === selectValue;
            bookCard.classList.toggle("hidden", !currentSelection);
        });
    });
}
