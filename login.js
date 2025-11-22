// login.js
import { setAuth } from './auth.js';

// basic form and inputs (email + password)
const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    //basic email + password validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // mock user until backend is ready
    const user = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        role: 'USER'
    };

    // save the auth session
    setAuth(user);

    // redirection of the user back to home page
    const params = new URLSearchParams(location.search);
    const target = params.get('returnTo') || '/home.html';

    // redirect the user after they login
    location.href = target;
});
