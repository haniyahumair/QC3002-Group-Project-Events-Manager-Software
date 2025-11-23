function checkLoginStatus() {
    const isLoggedIn = true;

    // Get elements
    const profileIcon = document.getElementById('profileIcon');
    const cartIcon = document.getElementById('cartIcon');
    const loginBtn = document.getElementById('loginBtn');

    if (isLoggedIn) {
        // Show icons
        profileIcon.style.display = 'inline-flex';
        cartIcon.style.display = 'inline-flex';

        // Hide login button
        loginBtn.style.display = 'none';
    } else {
        // Hide icons
        profileIcon.style.display = 'none';
        cartIcon.style.display = 'none';

    // Show login button
    loginBtn.style.display = 'inline-block';
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', checkLoginStatus);