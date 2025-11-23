//edit js file - from cart.html

const categoriesBtn = document.getElementById('categoriesBtn');
const priceBtn = document.getElementById('priceBtn');
const categoriesDropdown = document.getElementById('categoriesDropdown');
const priceDropdown = document.getElementById('priceDropdown');


function toggleDropdown(button, dropdown) {
    const isVisible = dropdown.classList.contains('show');
    document.querySelectorAll('.dropdown-menu-custom').forEach(menu => menu.classList.remove('show'));
    if (!isVisible) dropdown.classList.add('show');
}

if (categoriesBtn) categoriesBtn.addEventListener('click', () => toggleDropdown(categoriesBtn, categoriesDropdown));
if (priceBtn) priceBtn.addEventListener('click', () => toggleDropdown(priceBtn, priceDropdown));


document.addEventListener('click', (event) => {
    if (!event.target.closest('.filter-btn') && !event.target.closest('.dropdown-menu-custom')) {
        document.querySelectorAll('.dropdown-menu-custom').forEach(menu => menu.classList.remove('show'));
    }
});

// PRICE FILTER LOGIC
if (priceDropdown) {
    const priceOptions = priceDropdown.querySelectorAll('div[data-filter]');
    const eventCards = document.querySelectorAll('.price-pill');

    priceOptions.forEach(option => {
        option.addEventListener('click', () => {
            const filter = option.dataset.filter;
            priceBtn.textContent = `★ ${option.textContent}`;

            eventCards.forEach(card => {
                let parent = card.parentElement.parentElement;
                parent.classList.remove('hidden');
                if (filter === 'free' && !card.classList.contains('price-free')) {
                    parent.classList.add('hidden');
                } else if (filter === 'paid' && !card.classList.contains('price-paid')) {
                    parent.classList.add('hidden');
                }
            });

            priceDropdown.classList.remove('show');
        });
    });

}

function removeItem(itemId) {
    const element = document.getElementById(itemId);
    if (element) {
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            element.remove(); // Reflows document automatically
        }, 400);
    }
}

// Quantity control
document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const change = parseInt(btn.getAttribute('data-change'));
        const quantitySpan = btn.parentElement.querySelector('.quantity');
        let current = parseInt(quantitySpan.textContent);
        current += change;
        if (current < 1) current = 1;
        quantitySpan.textContent = current;
        const hiddenInput = btn.parentElement.querySelector('input[type="hidden"]');
        hiddenInput.value = current;
    });
});

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = {};
    formData.forEach((value, key) => {
        entries[key] = value;
    });
    console.log('Submitting quantities:', entries);
    // Redirect or handle checkout logic here
    alert('Proceeding to checkout with: ' + JSON.stringify(entries));
});

