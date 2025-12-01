// helpers
const safe = el => el !== null && el !== undefined;
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

const categoriesBtn = document.getElementById('categoriesBtn');
const priceBtn = document.getElementById('priceBtn');
const categoriesDropdown = document.getElementById('categoriesDropdown');
const priceDropdown = document.getElementById('priceDropdown');

// remove item logic
window.removeItem = function removeItem(itemId) {
    const el = document.getElementById(itemId);
    if (!safe(el)) return;
    
    el.remove();
};

// quantity button logic
function wireQuantityButtons() {
    const qtyButtons = qsa('.qty-btn'); // matches cart.html 
    if (!qtyButtons.length) return;
    
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const change = parseInt(btn.getAttribute('data-change')) || 0;
            const container = btn.closest('.quantity-control');
            if (!container) return;
            
            const quantitySpan = container.querySelector('.quantity');
            const hiddenInput = container.querySelector('input[type="hidden"]');
            
            let current = parseInt(quantitySpan.textContent) || 1;
            current = Math.max(1, current + change);
            
            quantitySpan.textContent = current;
            if (hiddenInput) hiddenInput.value = current;
        });
    });
})();

// dropdown logic
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

// price filter logic
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

// checkout form logic 
function wireCheckout() {
    const form = qs('#checkoutForm') || qs('form.checkout-form');
    if (!safe(form)) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const entries = {};
        fd.forEach((value, key) => {
            entries[key] = value;
        });
    });
}

// close dropdown by clicking logic
document.addEventListener('click', (event) => {
    if (!event.target.closest('.filter-btn') && !event.target.closest('.dropdown-menu-custom')) {
        document.querySelectorAll('.dropdown-menu-custom')
            .forEach(m => m.classList.remove('show'));
    }
});
