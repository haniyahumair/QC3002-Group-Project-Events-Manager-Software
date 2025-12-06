import { getAuth } from './auth.js';
//let isLoggedIn = true;


function checkLoginStatus() {
  // retrieve user status from login/signup 
  const authData = getAuth();
  const isLoggedIn = authData.isAuthenticated;
  
  // UI elements to be shown based on whether the user is logged in or not
  const profileIcon = document.getElementById('profileIcon');
  const cartIcon = document.getElementById('cartIcon');
  const loginBtn = document.getElementById('loginBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  
  // navigation bar visibility logic
  if (isLoggedIn) {
    if(profileIcon) profileIcon.style.display = 'inline-block';
    if(cartIcon) cartIcon.style.display = 'inline-block';
    if(loginBtn) loginBtn.style.display = 'none';
    if(signOutBtn) signOutBtn.style.display = 'inline-block';
  } else {
    if(profileIcon) profileIcon.style.display = 'none';
    if(cartIcon) cartIcon.style.display = 'none';
    if(signOutBtn) signOutBtn.style.display = 'none';
    if(loginBtn) loginBtn.style.display = 'inline-block';
  }
  
  const viewDetailsBtn = document.querySelectorAll('.viewDetailBtn');
  const createEventBtn = document.querySelectorAll('.createEvent');
  
  if(viewDetailsBtn.length > 0){
    viewDetailsBtn.forEach(btn => { 
      btn.style.cursor = 'pointer';
      const eventId = btn.dataset.id;
      btn.addEventListener('click', () => {
        if (isLoggedIn){
          window.location.href = `details.html?id=${eventId}`;
        } else {
          window.location.href = 'login.html';
        }
      });
    });
  }
  
  if(createEventBtn.length > 0){
    createEventBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isLoggedIn){
          window.location.href = 'create.html';
        } else { 
          window.location.href = 'login.html';
        }
      });
    });

    // view database on web console
    console.log('User is logged in:', isLoggedIn);
  }
}
// run logic after loading
document.addEventListener('DOMContentLoaded', checkLoginStatus);