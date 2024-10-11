// Function to display current local date and time
function displayDateTime() {
    const now = new Date(); // Get the current date and time
    // Format the date and time string
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 12-hour format
    };
    const formattedDateTime = now.toLocaleString('en-US', options); // Format the date and time
    document.getElementById('date-time').textContent = formattedDateTime; // Update the DOM element
}

// Call displayDateTime every second
setInterval(displayDateTime, 1000); // Update every second



// Contact Us Form Validation
function validateContactForm() {
    // Clear previous error messages
    clearErrorMessages();

    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let phoneNumber = document.getElementById('phone-number').value;
    let email = document.getElementById('email').value;
    let comment = document.getElementById('comment').value;

    let nameRegex = /^[A-Z][a-zA-Z]*$/;
    let phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;

    if (!nameRegex.test(firstName)) {
        document.getElementById('first-name-error').textContent = "First name should start with a capital letter and contain only alphabetic characters.";
        isValid = false;
    }

    if (!nameRegex.test(lastName)) {
        document.getElementById('last-name-error').textContent = "Last name should start with a capital letter and contain only alphabetic characters.";
        isValid = false;
    }

    if (firstName === lastName) {
        document.getElementById('last-name-error').textContent = "First name and last name cannot be the same.";
        isValid = false;
    }

    if (!phoneRegex.test(phoneNumber)) {
        document.getElementById('phone-number-error').textContent = "Phone number must be in the format (ddd) ddd-dddd.";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = "Invalid email format.";
        isValid = false;
    }

    if (comment.length < 10) {
        document.getElementById('comment-error').textContent = "Comment must be at least 10 characters long.";
        isValid = false;
    }

    return isValid;
}

// Function to clear error messages
function clearErrorMessages() {
    document.getElementById('first-name-error').textContent = "";
    document.getElementById('last-name-error').textContent = "";
    document.getElementById('phone-number-error').textContent = "";
    document.getElementById('gender-error').textContent = "";
    document.getElementById('email-error').textContent = "";
    document.getElementById('comment-error').textContent = "";
}


// Stays Form Validation
function validateStaysForm() {
    // Implement stays form validation logic here
    return true;
}

// Flight Form Validation 

// Function to toggle return date visibility based on trip type
function toggleReturnDate() {
    const tripType = document.getElementById('trip-type').value;
    const returnDateSection = document.getElementById('return-date-section');
    
    if (tripType === 'round-trip') {
        returnDateSection.style.display = 'block';
    } else {
        returnDateSection.style.display = 'none';
    }
}

// Flight Form Validation
function validateFlightForm() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;
    const passengers = document.getElementById('passengers').value;

    const validCities = ["Dallas", "Houston", "Austin", "San Antonio", "Los Angeles", "San Francisco"];
    
    if (!validCities.includes(origin) || !validCities.includes(destination)) {
        alert("Origin and destination must be a city in Texas or California.");
        return false;
    }

    const depDate = new Date(departureDate);
    const validStartDate = new Date("2024-09-01");
    const validEndDate = new Date("2024-12-01");

    if (depDate < validStartDate || depDate > validEndDate) {
        alert("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");
        return false;
    }

    if (passengers > 4) {
        alert("Number of passengers cannot exceed 4.");
        return false;
    }

    return true;
}


// Cars Form Validation
function validateCarForm() {
    // Implement car form validation logic here
    return true;
}

// Cruise Form Validation
function validateCruiseForm() {
    // Implement cruise form validation logic here
    return true;
}
