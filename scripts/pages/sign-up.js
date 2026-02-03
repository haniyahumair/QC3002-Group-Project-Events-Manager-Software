let selectedRole = 'student';

document.addEventListener('DOMContentLoaded', () => {
    setupRoleToggle();
    setupForm();
});

function setupRoleToggle() {
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const studentFields = document.getElementById('studentFields');
    const adminFields = document.getElementById('adminFields');

    roleRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedRole = e.target.value;

            if (selectedRole === 'student') {
                studentFields.style.display = 'block';
                adminFields.style.display = 'none';

                document.getElementById('student_id').required = true;
                document.getElementById('major').required = true;
                document.getElementById('year_of_study').required = true;
                document.getElementById('department').required = false;
            } else {
                studentFields.style.display = 'none';
                adminFields.style.display = 'block';

                document.getElementById('student_id').required = false;
                document.getElementById('major').required = false;
                document.getElementById('year_of_study').required = false;
                document.getElementById('department').required = true;
            }
        });
    });
}

function setupForm() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!name || !email || !password) {
            alert('Please fill in all required fields');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        let userData = {
            full_name: name,
            role: selectedRole,
            is_admin: selectedRole === 'admin',
            admin_approved: false
        };

        if (selectedRole === 'student') {
            const studentId = document.getElementById('student_id').value.trim();
            const major = document.getElementById('major').value.trim();
            const yearOfStudy = document.getElementById('year_of_study').value;

            if (!studentId || !major || !yearOfStudy) {
                alert('Please fill in all student fields');
                return;
            }

            userData.student_id = studentId;
            userData.major = major;
            userData.year_of_study = parseInt(yearOfStudy);
            userData.university = 'Qatar University';
        } else {
            const department = document.getElementById('department').value.trim();

            if (!department) {
                alert('Please enter your department/organization');
                return;
            }

            userData.department = department;
        }

        const submitBtn = form.querySelector('.sign-up-btn');
        submitBtn.disabled = true;
        submitBtn.value = 'Creating Account...';

        console.log('Signup payload:', { email, password, userData });

        try {
            // POST to Node.js backend
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, userData })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Server returned error:', text);
                alert('Signup failed. See console for details.');
                return;
            }
            
            const result = await response.json();

            if (result.error) {
                alert('Signup failed: ' + result.error);
            } else {
                if (selectedRole === 'admin') {
                    alert('Admin account created! Please wait for approval before you can access all features.');
                } else {
                    alert('Account created successfully! Welcome to Campus Connect!');
                }
                window.location.href = '/pages/login.html';
            }
        } catch (err) {
            console.error('Signup error:', err);
            alert('Signup failed. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.value = 'Sign Up';
        }
    });
}
