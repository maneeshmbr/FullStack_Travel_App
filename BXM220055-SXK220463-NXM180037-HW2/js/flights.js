// Function to display current local date and time
function displayDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    };
    const formattedDateTime = now.toLocaleString('en-US', options);
    document.getElementById('date-time').textContent = formattedDateTime;
}

// Call displayDateTime every second
setInterval(displayDateTime, 1000);

// Toggle return date based on trip type
function toggleReturnDate() {
    const tripType = document.getElementById('trip-type').value;
    const returnDateSection = document.getElementById('return-date-section');
    
    if (tripType === 'round-trip') {
        returnDateSection.style.display = 'block';
    } else {
        returnDateSection.style.display = 'none';
    }
}

let passengerCount = 0; // Keep track of the number of passengers

document.getElementById('passenger-icon').addEventListener('click', function() {
    const passengerForm = document.getElementById('passenger-form');
    if (passengerForm.style.display === 'none') {
        passengerForm.style.display = 'block';
        addPassengerForm(); // Add the first passenger form when displayed
    } else {
        passengerForm.style.display = 'none';
    }
});

// Function to add passenger form
function addPassengerForm() {
    const container = document.getElementById('passenger-details-container');
    const passengerDiv = document.createElement('div');
    passengerDiv.id = `passenger-${passengerCount}`;
    passengerDiv.innerHTML = `
        <h4>Passenger ${passengerCount + 1}</h4>
        <label for="first-name-${passengerCount}">First Name:</label>
        <input type="text" id="first-name-${passengerCount}" required>
        <div class="error-message" id="first-name-error-${passengerCount}"></div>
        
        <label for="last-name-${passengerCount}">Last Name:</label>
        <input type="text" id="last-name-${passengerCount}" required>
        <div class="error-message" id="last-name-error-${passengerCount}"></div>
        
        <label for="passenger-type-${passengerCount}">Passenger Type:</label>
        <select id="passenger-type-${passengerCount}">
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
        </select>
        
        <label for="gender-${passengerCount}">Gender:</label>
        <select id="gender-${passengerCount}">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        
        <label for="dob-${passengerCount}">Date of Birth:</label>
        <input type="date" id="dob-${passengerCount}" required>
        
        <button type="button" onclick="removePassenger('${passengerDiv.id}')">Remove Passenger</button>
        <hr>
    `;
    container.appendChild(passengerDiv);
    passengerCount++;
}

// Add the event listener for the "Add Another Passenger" button
document.getElementById('add-passenger').addEventListener('click', function() {
    addPassengerForm();  // Add a new passenger form when the button is clicked
});

// Function to remove passenger form
function removePassenger(id) {
    const passengerDiv = document.getElementById(id);
    if (passengerDiv) {
        passengerDiv.remove();
        passengerCount--; // Decrement the passenger count
    }
}

// Validate form fields
function validateFlightForm() {
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const tripType = document.getElementById('trip-type').value;

    // Regex for date validation (between Sept 1, 2024, to Dec 1, 2024)
    const dateRegex = /^(2024-(09|10|11|12)-(0[1-9]|[12][0-9]|3[01]))$/;

    // Validate date range
    if (!dateRegex.test(departureDate)) {
        document.getElementById('error-message').innerText = "Departure date must be between September 1, 2024, and December 1, 2024.";
        return false; // Prevent form submission
    }

    // Validate that origin and destination are in Texas or California
    const validCities = ["Dallas", "Houston", "Austin", "San Antonio", "Fort Worth", 
        "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo", "Los Angeles", 
        "San Francisco", "San Diego", "San Jose", "Fresno", "Sacramento", "Long Beach", 
        "Oakland", "Bakersfield", "Anaheim"];

    if (!validCities.includes(origin) || !validCities.includes(destination)) {
        document.getElementById('error-message').innerText = "Origin and destination must be a city in Texas or California.";
        return false; // Prevent form submission
    }

    // Check if at least one passenger has been added
    if (passengerCount === 0) {
        document.getElementById('error-message').innerText = "Please add at least one passenger.";
        return false; // Prevent form submission
    }

    // Validate passenger counts
    const passengerTypesCount = {
        adult: 0,
        child: 0,
        infant: 0
    };

    for (let i = 0; i < passengerCount; i++) {
        const type = document.getElementById(`passenger-type-${i}`).value;
        passengerTypesCount[type]++;
    }

    for (const type in passengerTypesCount) {
        if (passengerTypesCount[type] > 4) {
            document.getElementById('error-message').innerText = `Number of ${type}s cannot be more than 4.`;
            return false; // Prevent form submission
        }
    }

    // Additional validation can be added here (e.g., check return date if round trip)
    if (tripType === 'round-trip' && new Date(returnDate) <= new Date(departureDate)) {
        document.getElementById('error-message').innerText = "Return date must be after departure date.";
        return false; // Prevent form submission
    }

    // If everything is valid, show the submitted details
    showSubmittedDetails();
    return false; // Prevent form submission for demonstration purposes
}

// Function to display submitted details
function showSubmittedDetails() {
    const submittedInfo = document.getElementById('submitted-info');
    submittedInfo.innerHTML = ""; // Clear previous information
    
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const tripType = document.getElementById('trip-type').value;
    
    submittedInfo.innerHTML += `<h3>Submitted Details</h3>`;
    submittedInfo.innerHTML += `<p>Origin: ${origin}</p>`;
    submittedInfo.innerHTML += `<p>Destination: ${destination}</p>`;
    submittedInfo.innerHTML += `<p>Departure Date: ${departureDate}</p>`;
    if (tripType === 'round-trip') {
        submittedInfo.innerHTML += `<p>Return Date: ${returnDate}</p>`;
    }
    
    // Display passengers
    submittedInfo.innerHTML += `<h4>Passengers</h4>`;
    const passengers = [];
    for (let i = 0; i < passengerCount; i++) {
        const firstName = document.getElementById(`first-name-${i}`).value;
        const lastName = document.getElementById(`last-name-${i}`).value;
        const type = document.getElementById(`passenger-type-${i}`).value;
        const gender = document.getElementById(`gender-${i}`).value;
        const dob = document.getElementById(`dob-${i}`).value;
        passengers.push(`Passenger ${i + 1}: ${firstName} ${lastName}, Type: ${type}, Gender: ${gender}, DOB: ${dob}`);
    }
    submittedInfo.innerHTML += `<p>${passengers.join('<br>')}</p>`;
}

// Assign search button functionality
document.getElementById('search-passengers').addEventListener('click', function() {
    validateFlightForm();
});

// Change the font size of the main content only
function changeFontSize(size) {
    document.getElementById("main-content").style.fontSize = size + "px";
    document.getElementById("font-size-value").textContent = size + "px";  // Display the size value
}

// Change the background color 
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;  // Change body background color
	document.querySelector(".content-wrapper").style.backgroundColor = color;
}
