function checkLoginStatus() {
    const isLoggedIn = true;

    const profileIcon = document.getElementById('profileIcon');
    const cartIcon = document.getElementById('cartIcon');
    const loginBtn = document.getElementById('loginBtn');

    if (isLoggedIn) {
        profileIcon.style.display = 'inline-flex';
        cartIcon.style.display = 'inline-flex';

        loginBtn.style.display = 'none';
    } else {
        profileIcon.style.display = 'none';
        cartIcon.style.display = 'none';

    loginBtn.style.display = 'inline-block';
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', checkLoginStatus);