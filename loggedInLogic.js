import { getAuth } from './auth.js';

function checkLoginStatus() {
    const isLoggedIn = true;
    
    // retrieve user status from login/signup 
    const user = JSON.parse(localStorage.getItem("authUser"));
    const isLoggedIn = Boolean(user);

// UI elements to be shown based on whether the user is logged in or not
    const profileIcon = document.getElementById('profileIcon');
    const cartIcon = document.getElementById('cartIcon');
    const loginBtn = document.getElementById('loginBtn');
    const viewDetailsBtn = document.querySelectorAll('.viewDetailBtn')
    const createEventBtn = document.querySelector('.createEvent')

    // navigation bar visibility logic based on login status (logged in: visible profile + cart / logged out: hidden)
    if (isLoggedIn) {
        profileIcon.style.display = 'inline-flex';
        cartIcon.style.display = 'inline-flex';

        loginBtn.style.display = 'none';
    } else {
        profileIcon.style.display = 'none';
        cartIcon.style.display = 'none';

        loginBtn.style.display = 'inline-block';
    }

    // details visibility logic (logged in: user directed to details page / logged out: user rdirected to login page)
    viewDetailsBtn.forEach(btn =>{
        btn.style.cursor = 'pointer'
        btn.addEventListener('click', () => {
            if (isLoggedIn){
                window.location.href = 'details.html'
            }
            else{
                window.location.href = 'login.html'
            }
        })
    })

    // (same cocept as above) create event button logic (logged in: user able to create event / logged out: user rdirected to login page)
    createEventBtn.addEventListener('click', () => {
        if (isLoggedIn){
            window.location.href = 'create.html'
        }
        else{
            window.location.href = 'login.html'
        }
    })
}

// run logic after loading
document.addEventListener('DOMContentLoaded', checkLoginStatus);
