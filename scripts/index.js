import { cart } from './cart.js';

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const searchBar = document.querySelector(".search-bar");
const searchIcon = searchBar?.querySelector("svg:first-child");

let current = 0;

function showSlide(index) {
slides.forEach((slide, i) => {
slide.classList.toggle("active", i === index);
dots[i].classList.toggle("active", i === index);
});
}

next.addEventListener("click", () => {
current = (current + 1) % slides.length;
showSlide(current);
});

prev.addEventListener("click", () => {
current = (current - 1 + slides.length) % slides.length;
showSlide(current);
});

dots.forEach((dot, index) => {
dot.addEventListener("click", () => {
current = index;
showSlide(current);
});
});

// Auto-slide (optional)
setInterval(() => {
current = (current + 1) % slides.length;
showSlide(current);
}, 5000);

// Mobile search bar expand/collapse
if (searchIcon && searchBar) {
searchIcon.addEventListener("click", () => {
searchBar.classList.toggle("active");
if (searchBar.classList.contains("active")) {
const input = searchBar.querySelector("input");
if (input) input.focus();
}
});
}

// Close search bar when clicking outside on mobile
document.addEventListener("click", (e) => {
if (
searchBar &&
searchBar.classList.contains("active") &&
!searchBar.contains(e.target)
) {
searchBar.classList.remove("active");
}
});

//featured ptojects
const products = [
{
productId:"P1001",
image:
"https://brain-images-ssl.cdn.dixons.com/8/2/10207228/u_10207228.jpg",
title: "Premium Wireless Headphones",
rating: {
stars: 5,
number: 1248,
},
price: 29900,
oldPrice: 39900,
discount: -25,
},
{
productId:"P1002",
image:
"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5764/5764800cv13d.jpg",
title: "Mobile phone",
rating: {
stars: 5,
number: 1248,
},
price: 18000,
oldPrice: 20000,
discount: -10,
},
];

let productsHTML = "";

products.forEach((product) => {
productsHTML += `
<article class="card">
    <div class="card-media light">
        <img src="${product.image}" alt="Premium Wireless Headphones" />
        <span class="badge">${product.discount}%</span>
    </div>
    <div class="card-body">
        <h3>${product.title}</h3>
        <div class="rating">★★★★★ <span class="muted">(${
                product.rating.number
                })</span></div>
        <div class="price">
            <strong>$${product.price / 100}</strong>
            <span class="muted old">$${product.oldPrice / 100}</span>
        </div>
        <div class="product">
            <div class="dropdown">
                <select class="products">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <button class="btn js-btn" data-product-id="${product.productId}">
                🛒 Add to Cart
            </button>
        </div>

    </div>
</article>
`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

const addToCartButtons = document.querySelectorAll(".js-btn");

addToCartButtons.forEach((button) => {
button.addEventListener("click", () => {
const productId = button.dataset.productId;

// find the dropdown related to THIS button
const productDiv = button.closest(".product");
const dropdown = productDiv.querySelector(".products");
const selectedValue = Number(dropdown.value);

let matchingItem = cart.find((item) => item.productId === productId);

if (matchingItem) {
matchingItem.quantity += selectedValue;
} else {
cart.push({
productId: productId,
quantity: selectedValue,
});
}

// update cart counter
let count = 0;
cart.forEach((item) => {
count += item.quantity;
});

document.querySelector(".count").innerHTML = count;
console.log(cart);
});
});
