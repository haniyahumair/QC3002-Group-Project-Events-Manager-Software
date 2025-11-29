document.addEventListener('DOMContentLoaded', () => {
    // event data by data-id. each event corrospond to a numeber to open the relavent details of that event
    const eventData = {
      1: {
        title: "AI in Action Workshop",
        description: "This session will be delivered by Abdulrahman Hassan, and Information Security Expert, and is designed for those keen to explore practical applications of AI and bridge the gap between theory and real world impact",
        //whatToExpect: [
          //"Insightfull application of AI",
          //"Hand on appplication",
          //"Food and drinks available",
          //"Q&A session"
        //],
        date: "Thursday, November 14, 2025",
        time: "04:00 - 06:00 PM",
        location: "AFG College, University of Aberdeen",
        price: "Free",
        image: "assets/Images/IMG_6404.jpg",
        contact: "ai@university.edu"
      },

      2: {
        title: "Football Championship Finals",
        description: "Witness the ultimate showdown! The top university football teams compete for the championship trophy. Cheer for your team in this electrifying finale of the inter-university league ",
        date: "Friday, December 12, 2025",
        time: "05:00 PM",
        location: "Qatar University Sports Complex",
        price: "Free",
        image: "assets/Images/football.jpg",
        contact: "sports@qu.edu.qa"
      },

      3: {
        title: "Festival Of Cultures",
        description: "Experience the world at our Festival of Cultures, celebrating the diverse traditions of our student community. Enjoy international cuisine, live performances, and activities that foster unity and cultural exchange.",
        date: "Saturday, February 7, 2026",
        time: "07:00 PM",
        location: "University of Doha Science and technology (UDST)",
        price: "25 QAR",
        image: "assets/Images/foc.jpg",
        contact: "foc@university.edu"
      },

      4: {
        title: "CMU-Q Statistical Consulting Center Workshop Series",
        description: "This semester's workshops will introduce statistical methods for biological scientists, focusing on how to choose appropriate methods for different research scenarios.",
        date: "November 27 2025",
        time: "03:00 PM - 05:00 PM",
        location: "3178 CMU-Q",
        price: "Free",
        image: "assets/Images/slide4-5.jpg",
        contact: "stat@cmu.edu"
      },

      5: {
        title: "AI, Skills, and the Future of (No) work",
        description: "How is artificial intelligence reshaping labor markets? Who stands to win—or lose—from the AI revolution, and what are the broader implications for youth, societies, and inequality? Drawing on his research analyzing 1.5 billion online job vacancies, as well as his close tracking of AI-related venture capital investments, Professor Antoniades explores these questions.",
        date: "December 1 2025",
        time: "06:00 - 08:00 PM",
        location: "Auditorium Georgetown University Qatar",
        price: "Free",
        image: "assets/Images/Directors-Cut_Events-Homepage.jpg.avif",
        contact: "stat@cmu.edu"
      }
    };

     const params = new URLSearchParams(window.location.search);
     const eventId = params.get('id');
     const event = eventData[eventId];
 
     if (!event) {
       // Optionally: show a friendly message or redirect back to events
       // window.location.href = 'events.html';
       return;
     }
 
     // populate fields (safe checks)
     const titleEl = document.querySelector('.event-title');
     if (titleEl) titleEl.textContent = event.title;
 
     const aboutParagraphs = document.querySelectorAll('.about p');
     if (aboutParagraphs.length > 0) aboutParagraphs[0].textContent = event.description;

     const aboutBulletPoints = document.querySelectorAll('.what-to-expect-list');
     if (aboutBulletPoints && event.whatToExpect){
        aboutBulletPoints.innerHTML = " "; //empty the current list
        event.whatToExpect.forEach(item => {
          const li = document.createElement('li'); //creating list element
          li.textContent = item;
          aboutBulletPoints.appendChild(item);
        });
     }
 
     const dateEl = document.querySelector('.date');
     if (dateEl) dateEl.innerHTML = `<strong><img src="assets/Icons/Calendar.svg" style="width:18px;height:18px;transform:translateY(3px)"> Date:</strong> ${event.date}`;
 
     const timeEl = document.querySelector('.time');
     if (timeEl) timeEl.innerHTML = `<strong><img src="assets/Icons/clock-icon.svg" style="width:18px;height:18px;transform:translateY(3px)"> Time:</strong> ${event.time}`;
 
     const locationEl = document.querySelector('.location');
     if (locationEl) locationEl.innerHTML = `<strong><img src="assets/Icons/Pin.svg" style="width:18px;height:18px;transform:translateY(3px)"> Location:</strong> ${event.location}`;
 
     const priceEl = document.querySelector('.price');
     if (priceEl) priceEl.textContent = event.price;
 
     const contactEl = document.querySelector('.contact-email');
     if (contactEl) contactEl.innerHTML = `<strong><img src="assets/Icons/mail-icon.svg" style="width:18px;height:18px;transform:translateY(3px)"> Contact Email:</strong> ${event.contact}`;
 
     const eventImage = document.querySelector('.event-image .image');
     if (eventImage) eventImage.src = event.image;
     
     
     
     // Optional: add-to-cart simple demo (stores eventId in sessionStorage for demo)
     const cartBtn = document.getElementById('cartBtn');
     if (cartBtn) {
       cartBtn.addEventListener('click', () => {
         // simple demo: save selected event id in sessionStorage (not secure, just for demo)
         const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
         if (!cart.includes(eventId)) {
           cart.push(eventId);
           sessionStorage.setItem('cart', JSON.stringify(cart));
           alert('Added to cart');
         } else {
           alert('Already in cart');
         }
       });
     }
   });