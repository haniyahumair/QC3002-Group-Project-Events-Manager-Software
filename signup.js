import { setAuth } from './auth.js';

// basic form and inputs (name, email, and password)
const form = document.querySelector('#register-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
  const name = (nameInput.value || '').trim();
  const email = (emailInput.value || '').trim();
  const password = (passwordInput.value || '').trim();

  // name, email, and password validation
  if (!name) { alert('Please enter your full name.'); return; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); return; } 
  if (!password || password.length < 6) { alert('Please enter a password of at least 6 characters.');
    return;
  }

  // mock user
   const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    role: 'USER'
  };
  
  setAuth(user);

  // redirect to home page
  const params = new URLSearchParams(location.search);
  const returnTo = params.get('returnTo') || '/home.html';

  //redirect
  location.href = returnTo;
});
