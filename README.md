# 🎓 Campus Connect

**A centralized platform for university students to discover, create, and register for campus events.**

Campus Connect solves the problem of scattered event information across multiple platforms by providing a single, verified student-only hub where all campus events can be discovered, promoted, and managed.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

---

## 🌟 Overview

Campus Connect addresses the common problem of students missing campus events due to fragmented information across emails, social media, posters, and group chats. Our platform provides:

- **Centralized Event Discovery**: All campus events in one organized location
- **Student Verification**: Secure, university-email verified access
- **Easy Event Management**: Simple event creation and registration process
- **Category-Based Browsing**: Filter events by type (Sports, Academic, Social, etc.)
- **Free Event Registration**: Cart system for quick event sign-ups

Inspired by the success of Classmate (a student discount platform in Qatar), Campus Connect applies the same community-focused approach to campus event management.

---

## ✨ Features

### Current Features

#### 🔐 Authentication & User Management
- User registration with university email verification
- Secure login system
- Profile page displaying user information
- Session management using localStorage
- Protected pages requiring authentication

#### 📅 Event Discovery
- Browse all campus events
- Filter events by category (Academic, Sports, Arts & Culture, Tech & Innovation, Workshop, Career, Social, Health & Wellness, Entertainment)
- View upcoming events
- Detailed event pages with venue, date, time, and pricing information

#### 🎫 Event Creation
- Simple event creation form
- Add event details: title, description, date, venue, price, category
- Event submission with pending approval status (UI implemented)

#### 🛒 Cart & Registration
- Add free events to cart
- Adjust event quantities
- Remove events from cart
- One-click checkout for free events
- Registration confirmation with redirect to profile

#### 💼 User Profile
- View registered events ("My Upcoming Events")
- View created events ("My Created Events")
- Sign out functionality

---

## 🛠 Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

**Data Storage:**
- localStorage (client-side storage for MVP)

**Future Backend (Planned):**
- Node.js + Express
- MongoDB

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campus-connect.git
   cd campus-connect
   ```

2. **Open the project**
   
   **Option A: Using a local server (recommended)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```
   Then open `http://localhost:8000` in your browser

   **Option B: Direct file opening**
   - Simply open `home.html` in your browser
   - Note: Some features may require a local server

3. **Start using Campus Connect**
   - Register with your university email
   - Browse events
   - Create your own events
   - Register for events you want to attend

---

## 📁 Project Structure

```
campus-connect/
├── assets/
│   ├── Icons/          # UI icons and logos
│   └── Images/         # Event images and graphics
├── styles/
│   ├── global.css      # Shared styles
│   ├── home.css        # Homepage styles
│   ├── events.css      # Events page styles
│   ├── cart.css        # Cart page styles
│   ├── profile.css     # Profile page styles
│   └── login-register.css
├── auth.js             # Authentication logic
├── login.js            # Login functionality
├── signup.js           # Registration functionality
├── cart.js             # Cart management
├── loggedInLogic.js    # Navigation & auth state UI
├── cardDetails.js      # Event card interactions
├── home.html           # Landing page
├── events.html         # Browse events page
├── create.html         # Create event page
├── cart.html           # Shopping cart page
├── profile.html        # User profile page
├── login.html          # Login page
├── signup.html         # Registration page
└── README.md
```

---

## 📖 Usage

### For Students (Event Attendees)

1. **Register/Login**
   - Click "Login" in the navigation bar
   - Create an account with your university email
   - Or login if you already have an account

2. **Browse Events**
   - View all events on the homepage
   - Use category filters to find specific types of events
   - Click "View Details" to see full event information

3. **Register for Events**
   - Click "Add to Cart" on event details page
   - View cart and adjust quantities if needed
   - Click "Proceed to Checkout"
   - Confirmation message appears and events are added to your profile

4. **Manage Your Events**
   - View your upcoming events in your profile
   - Access your profile by clicking the user icon in the navigation bar

---

## 📸 Screenshots

- Homepage with event cards
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/7c895f91-ca2b-488a-b715-fbc316505b37" />
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/e9b9d8c4-7d66-4c32-8ca4-31e4e9d2521a" />
- Event page
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/891512b8-fcdf-4965-871e-e100bc80c82b" />
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/e1183897-7532-473b-8049-9f1001ebe86a" />
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/1d72254a-b9d8-463a-95a4-27671f9ef232" />
- Event Detail page
  <img width="1267" height="716" alt="image" src="https://github.com/user-attachments/assets/41f857ee-1c6c-427a-8d34-806b2e2221a8" />
  <img width="1267" height="716" alt="image" src="https://github.com/user-attachments/assets/b325e19f-34a6-4f4a-9620-cfc00f217774" />
- Registration flow
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/2acb0f21-0e07-45a8-9940-5817b5e3f412" />
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/ba9580d7-f385-4faf-904a-6aa4028a2996" />
- User profile
  <img width="1267" height="720" alt="image" src="https://github.com/user-attachments/assets/52f0af39-65fa-4ee3-9ff1-f7f6bfffe7f9" />
  <img width="1267" height="610" alt="image" src="https://github.com/user-attachments/assets/50b86dc5-139e-4349-b1d4-e2e4eac2e122" />
  <img width="1267" height="633" alt="image" src="https://github.com/user-attachments/assets/aac86014-f674-4f6d-8663-7992b0a3cbda" />
- Event creation form
  <img width="1267" height="712" alt="image" src="https://github.com/user-attachments/assets/6fa1b1f9-3162-4595-ba82-d2eaf6a8afe0" />
  <img width="1267" height="716" alt="image" src="https://github.com/user-attachments/assets/3f6da120-08f5-43f2-ba48-731d406c6520" />
- Cart page
  <img width="1267" height="716" alt="image" src="https://github.com/user-attachments/assets/470b34a8-a258-45f0-a9f0-cc9d4f51fa2e" />
  <img width="1267" height="716" alt="image" src="https://github.com/user-attachments/assets/50e79265-730a-4283-8b05-66bbef5bb850" />
  
---

## 🔮 Future Enhancements

### Planned Features

**Backend Integration**
- [ ] Node.js/Express server implementation
- [ ] MongoDB database for persistent storage
- [ ] RESTful API for frontend-backend communication
- [ ] Secure password hashing (bcrypt)
- [ ] JWT-based authentication

**Event Management**
- [ ] Admin approval dashboard
- [ ] Edit/delete events after creation
- [ ] Event cancellation
- [ ] Attendance tracking for organizers
- [ ] QR code check-in system

**User Experience**
- [ ] Email notifications for upcoming events
- [ ] Event reminders (24 hours before)
- [ ] Search functionality
- [ ] Event sharing on social media
- [ ] User reviews and ratings

**Additional Features**
- [ ] Paid event support with payment gateway integration
- [ ] Venue booking system integration
- [ ] Event analytics for organizers
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Push notifications for new events in preferred categories

---

## 👥 Contributors

**Team Members:**
- **Haniyah Umair** - Project Manager, UX/UI Designer, Frontend Developer
- **Abdullah** - Full-Stack Developer (JavaScript Specialization)
- **George** - Backend Developer, Database Administrator

---

## 📄 License

This project is developed as part of a university coursework assignment.

---

## 🙏 Acknowledgments

- Inspired by **Classmate**, a successful student discount platform in Qatar
- Built to address real student needs for centralized event discovery
- Developed for students, by students

---

## 📞 Contact

For questions or feedback, please contact:
- University Email: u01hu23@abdn.ac.uk
- Personal Email: haniyah.umair.18@gmail.com

---

## 🐛 Known Issues

- Cart currently only supports free events (paid event checkout coming soon)
- Event editing/deletion not yet implemented
- Admin approval system UI complete but backend pending
- Profile event lists currently show mock data (integration with real data in progress)

---

**Made with ❤️ for the Qatar students community**
