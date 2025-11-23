//create event button
function submitEvent(){
    //submitting and going to profile page and showing the newly created event under the My Created Events
}


//date and time to text - edit to get rid of plagarism
const form = document.querySelector('.create-events-form');
const dateInput = document.querySelector('input[type="date"]');
const timeInput = document.querySelector('input[type="time"]');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get date value (format: YYYY-MM-DD)
    const dateValue = dateInput.value;
    const date = new Date(dateValue);
    
    // Convert to "November 14 2025" format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = date.toLocaleDateString('en-US', options);
    
    // Get time value (format: HH:MM)
    const timeValue = timeInput.value;
    const [hours, minutes] = timeValue.split(':');
    
    // Convert to 12-hour format with AM/PM
    let hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    hour12 = hour12 % 12 || 12;
    const displayTime = `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    
    // Now you have:
    console.log(displayDate); // "November 14 2025"
    console.log(displayTime); // "04:00 PM"
    
});

//display of the information after the event is created has to be in the card ive designed - talk with George and Abdullah about this

// code below create.html
const categoriesBtn = document.getElementById('categoriesBtn');
    const priceBtn = document.getElementById('priceBtn');
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    const priceDropdown = document.getElementById('priceDropdown');


    function toggleDropdown(button, dropdown) {
        const isVisible = dropdown.classList.contains('show');
        document.querySelectorAll('.dropdown-menu-custom').forEach(menu => menu.classList.remove('show'));
        if (!isVisible) dropdown.classList.add('show');
    }


    categoriesBtn.addEventListener('click', () => toggleDropdown(categoriesBtn, categoriesDropdown));
    priceBtn.addEventListener('click', () => toggleDropdown(priceBtn, priceDropdown));


    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filter-btn') && !event.target.closest('.dropdown-menu-custom')) {
            document.querySelectorAll('.dropdown-menu-custom').forEach(menu => menu.classList.remove('show'));
        }
    });

    // PRICE FILTER LOGIC
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

