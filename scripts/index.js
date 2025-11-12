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
