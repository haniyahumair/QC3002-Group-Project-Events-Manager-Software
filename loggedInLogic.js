function checkLoginStatus() {
    const isLoggedIn = true;

    const profileIcon = document.getElementById('profileIcon');
    const cartIcon = document.getElementById('cartIcon');
    const loginBtn = document.getElementById('loginBtn');
    const viewDetailsBtn = document.querySelectorAll('.viewDetailBtn')
    const createEventBtn = document.querySelector('.createEvent')

    if (isLoggedIn) {
        profileIcon.style.display = 'inline-flex';
        cartIcon.style.display = 'inline-flex';

        loginBtn.style.display = 'none';
    } else {
        profileIcon.style.display = 'none';
        cartIcon.style.display = 'none';

        loginBtn.style.display = 'inline-block';
    }

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

    createEventBtn.addEventListener('click', () => {
        if (isLoggedIn){
            window.location.href = 'create.html'
        }
        else{
            window.location.href = 'login.html'
        }
    })
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', checkLoginStatus);