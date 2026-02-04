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
// scripts/pages/signup.js
import { supabase } from '../config/supabase.js'

let selectedRole = 'student'

document.addEventListener('DOMContentLoaded', () => {
    setupRoleToggle()
    setupForm()
})

function setupRoleToggle() {
    const roleRadios = document.querySelectorAll('input[name="role"]')
    const studentFields = document.getElementById('studentFields')
    const adminFields = document.getElementById('adminFields')

    roleRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedRole = e.target.value
            
            if (selectedRole === 'student') {
                studentFields.style.display = 'block'
                adminFields.style.display = 'none'
                
                document.getElementById('student_id').required = true
                document.getElementById('major').required = true
                document.getElementById('year_of_study').required = true
                document.getElementById('department').required = false
            } else {
                studentFields.style.display = 'none'
                adminFields.style.display = 'block'
                
                document.getElementById('student_id').required = false
                document.getElementById('major').required = false
                document.getElementById('year_of_study').required = false
                document.getElementById('department').required = true
            }
        })
    })
}

function setupForm() {
    const form = document.getElementById('register-form')
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        // Get form values
        const name = document.getElementById('name').value.trim()
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value
        
        // Validate
        if (!name || !email || !password) {
            alert('Please fill in all required fields')
            return
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters')
            return
        }
        
        // Prepare user data based on role
        let userData = {
            full_name: name,
            role: selectedRole,
            is_admin: selectedRole === 'admin',
            admin_approved: false
        }
        
        if (selectedRole === 'student') {
            const studentId = document.getElementById('student_id').value.trim()
            const major = document.getElementById('major').value.trim()
            const yearOfStudy = document.getElementById('year_of_study').value
            
            if (!studentId || !major || !yearOfStudy) {
                alert('Please fill in all student fields')
                return
            }
            
            userData.student_id = studentId
            userData.major = major
            userData.year_of_study = parseInt(yearOfStudy)
            userData.university = 'Qatar University'
        } else {
            const department = document.getElementById('department').value.trim()
            
            if (!department) {
                alert('Please enter your department/organization')
                return
            }
            
            userData.department = department
        }
        
        // Disable submit button
        const submitBtn = form.querySelector('.sign-up-btn')
        submitBtn.disabled = true
        submitBtn.value = 'Creating Account...'
        
        try {
            console.log('Starting signup...', userData)
            
            // Step 1: Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password
            })
            
            console.log('Auth response:', authData, authError)
            
            if (authError) throw authError
            
            if (!authData.user) {
                throw new Error('No user returned from signup')
            }
            
            console.log('User created:', authData.user.id)
            
            // Step 2: Create profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: authData.user.id,
                    email: email,
                    ...userData
                }])
                .select()
            
            console.log('Profile response:', profileData, profileError)
            
            if (profileError) throw profileError
            
            // Success!
            if (selectedRole === 'admin') {
                alert('✅ Admin account created! Please wait for approval before you can access all features.')
            } else {
                alert('✅ Account created successfully! Welcome to Campus Connect!')
            }
            
            // Redirect to login
            window.location.href = '/pages/login.html'
            
        } catch (error) {
            console.error('Signup error:', error)
            
            // Show user-friendly error messages
            let errorMessage = 'Failed to create account. '
            
            if (error.message.includes('already registered') || error.message.includes('already been registered')) {
                errorMessage = 'This email is already registered. Please login instead.'
            } else if (error.message.includes('duplicate key')) {
                if (error.message.includes('student_id')) {
                    errorMessage = 'This Student ID is already registered.'
                } else {
                    errorMessage = 'This email is already registered.'
                }
            } else if (error.message.includes('invalid email')) {
                errorMessage = 'Please enter a valid email address.'
            } else {
                errorMessage += error.message
            }
            
            alert(errorMessage)
            
            // Re-enable submit button
            submitBtn.disabled = false
            submitBtn.value = 'Sign Up'
        }
    })
}