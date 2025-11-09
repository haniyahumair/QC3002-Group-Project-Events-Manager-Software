// imports
import {getAuth, clearAuth, requireAuth} from './js/auth.js';

// constants
const btnLogin = document.querySelector('#btnLogin');
const navCreate = document.querySelector('#navCreate');
const heroCreate = document.querySelector('#heroCreate');
const heroBrowse = document.querySelector('#heroBrowse');

// main function for loading page
if (auth.isAuthenticated) {
  btnLogin.textContent = 'Logout';
  btnLogin.onclick = () => {
    clearAuth();
    location.reload();
  };
} else {
  btn
  
