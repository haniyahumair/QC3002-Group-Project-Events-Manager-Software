//import { setAuth } from './auth.js';

/*// basic form and inputs (name, email, and password)
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
*/

// scripts/pages/signup.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://mvhfqxhgxarfnzbjntef.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aGZxeGhneGFyZm56YmpudGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NDkyNjIsImV4cCI6MjA4NTUyNTI2Mn0._cYsS4bWBTymDWlmxbecu-Xrh7D7bRknCzIU86rGK3M';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
            const isStudent = selectedRole === 'student';

            studentFields.style.display = isStudent ? 'block' : 'none';
            adminFields.style.display = isStudent ? 'none' : 'block';

            toggleFieldRequirements(isStudent);
        });
    });
}

function toggleFieldRequirements(isStudent) {
    document.getElementById('student_id').required = isStudent;
    document.getElementById('major').required = isStudent;
    document.getElementById('year_of_study').required = isStudent;
    document.getElementById('department').required = !isStudent;
}

function setupForm() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.sign-up-btn');
        submitBtn.disabled = true;
        submitBtn.value = 'Creating Account...';

        try {
            const userData = getUserData();
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: { data: userData }
            });

            if (authError) throw authError;

            await insertProfile(authData.user.id, userData);

            alert(selectedRole === 'admin'
                ? 'Admin account created! Please wait for approval.'
                : 'Account created successfully! Welcome to Campus Connect!');
            window.location.href = '/pages/login.html';
        } catch (error) {
            handleSignupError(error);
            submitBtn.disabled = false;
            submitBtn.value = 'Sign Up';
        }
    });
}

function getUserData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        throw new Error('Please fill in all required fields.');
    }

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
    }

    const userData = {
        full_name: name,
        email,
        password,
        role: selectedRole,
        is_admin: selectedRole === 'admin',
        admin_approved: false
    };

    if (selectedRole === 'student') {
        const studentId = document.getElementById('student_id').value.trim();
        const major = document.getElementById('major').value.trim();
        const yearOfStudy = document.getElementById('year_of_study').value;

        if (!studentId || !major || !yearOfStudy) {
            throw new Error('Please fill in all student fields.');
        }

        userData.student_id = studentId;
        userData.major = major;
        userData.year_of_study = parseInt(yearOfStudy);
        userData.university = 'Qatar University';
    } else {
        const department = document.getElementById('department').value.trim();
        if (!department) {
            throw new Error('Please enter your department/organization.');
        }
        userData.department = department;
    }

    return userData;
}

async function insertProfile(userId, userData) {
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, ...userData }]);

    if (profileError) throw profileError;
}

function handleSignupError(error) {
    console.error('Signup error:', error);

    let errorMessage = 'Failed to create account. ';
    if (error.message.includes('already registered')) {
        errorMessage = 'This email is already registered. Please login instead.';
    } else if (error.message.includes('duplicate key value')) {
        errorMessage = error.message.includes('student_id')
            ? 'This Student ID is already registered.'
            : 'This email is already registered.';
    } else if (error.message.includes('invalid email')) {
        errorMessage = 'Please enter a valid email address.';
    } else if (error.message.includes('Password should be')) {
        errorMessage = error.message;
    } else {
        errorMessage += error.message;
    }

    alert(errorMessage);
}