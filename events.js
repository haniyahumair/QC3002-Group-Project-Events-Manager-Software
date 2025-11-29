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

// price filtering (based on free/paid events)
const priceOptions = priceDropdown.querySelectorAll("div[data-filter]");

priceOptions.forEach(option => {
    option.addEventListener("click", () => {
        const filter = option.dataset.filter;
        priceBtn.textContent = '${option.textContent}';

        eventCards.forEach(card => {
            const pill = card.querySelector(".price-pill");
            const Free = pill.classList.contains("price-free");
            const Paid = pill.classList.contains("price-paid");

            card.classList.remove("hidden");

            if (filter === "free" && !Free) {
                card.classList.add("hidden");
            }
            else if (filter === "paid" && !Paid) {
                card.classList.add("hidden");
            }
        });

        priceDropdown.classList.remove("show");
    });
});
