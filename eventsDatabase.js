// create events localStorage database

const EVENTS_KEY = 'cc_events';

export function getAllEvents(){
    try{
        return JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];
    }
    catch{
        return [];
    }
}

export function getEventsByID(id){
    const events = getAllEvents();
    return events.find(event => event.id === id);
}

export function saveEvent(eventData){
    const events = getAllEvents();
    const newEvent = {
        id: Date.now().toString(),
        ...eventData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    return newEvent;
}

export function clearEvents(){
    localStorage.removeItem(EVENTS_KEY);
}

//form handler
const submitEventBtn = document.getElementById('sumbitBtn');

if (submitEventBtn) {
    submitEventBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const eventTitle = document.querySelector('input[placeholder= "Event Name"]').value;
        const eventDescription = document.querySelector('textArea[placeholder= "About"]').value;
        const eventDate = document.querySelector('input[type= "date"]').value;
        const eventTime = document.querySelector('input[type= "time"]').value;
        const eventLocation = document.querySelector('input[placeholder= "Location"]').value;
        const eventPrice = document.querySelector('input[placeholder= "e.g. Free or 25 QAR"]').value;
        const eventType = document.querySelector('.form-select').value;
        const eventContactDetails = document.querySelector('.form-control').value;
        const eventImage = document.getElementById('eventPhoto').files[0];

        if (!eventTitle || !eventDescription || !eventDate || !eventTime || !eventLocation || !eventPrice || !eventType || !eventContactDetails || !eventImage) {
            alert('Please fill in all fields before submitting the event.');
            return;
        };

        const eventData = {
            title: eventTitle,
            description: eventDescription,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            price: eventPrice,
            type: eventType,
            contactDetails: eventContactDetails,
            imageURL: eventImage
        };

        const createdEvent = saveEvent(eventData);
        // view database on web console
        console.log('Event created:', createdEvent); 
        console.log('Event Data:', eventData);
        console.log('All events:', getAllEvents());

        alert('Event sent to admin for review!');

        window.location.href = 'profile.html';
    });
}