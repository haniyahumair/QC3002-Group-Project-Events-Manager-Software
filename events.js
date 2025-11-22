// events.js
const categoriesBtn = document.getElementById("categoriesBtn"); 
const priceBtn = document.getElementById("priceBtn"); 
const categoriesDropdown = document.getElementById("categoriesDropdown"); 
const priceDropdown = document.getElementById("priceDropdown"); 
const eventCards = document.querySelectorAll(".event-card"); const pricePills = document.querySelectorAll(".price-pill");

// dropdown toggle
function toggleDropdown(button, dropdown) {
    const isVisible = dropdown.classList.contains("show");

    document.querySelectorAll(".dropdown-menu-custom")
        .forEach(menu => menu.classList.remove("show"));

    if (!isVisible) {
        dropdown.classList.add("show");
    }
}

categoriesBtn.addEventListener("click", () =>
    toggleDropdown(categoriesBtn, categoriesDropdown)
);

priceBtn.addEventListener("click", () =>
    toggleDropdown(priceBtn, priceDropdown)
);
