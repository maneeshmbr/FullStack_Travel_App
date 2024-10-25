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

// Update the minimum check-out date based on the selected check-in date
document.getElementById('check-in').addEventListener('change', function() {
    const checkInDate = new Date(this.value);
    const checkOutInput = document.getElementById('check-out');
    
    // Set the minimum check-out date to be one day after check-in
    if (checkInDate) {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(checkInDate.getDate() + 1); // Add one day
        const minCheckOutDate = nextDay.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
        
        // Set the minimum attribute of check-out date
        checkOutInput.min = minCheckOutDate;
        checkOutInput.max = "2024-12-01"; // Set maximum check-out date

        // If the current check-out date is before the new minimum, reset it
        if (checkOutInput.value < minCheckOutDate || checkOutInput.value > checkOutInput.max) {
            checkOutInput.value = ''; // Clear invalid check-out date
        }
    }
});


// List of valid cities in Texas and California
const validCities = ["Dallas", "Houston", "Austin", "San Antonio", "Fort Worth", 
    "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo", "Los Angeles", 
    "San Francisco", "San Diego", "San Jose", "Fresno", "Sacramento", "Long Beach", 
    "Oakland", "Bakersfield", "Anaheim"];


// Validate the car form inputs
function validateCarForm() {
    const city = document.getElementById('city').value.trim();
    const carType = document.getElementById('car-type').value;
    const checkIn = new Date(document.getElementById('check-in').value);
    const checkOut = new Date(document.getElementById('check-out').value);

    // Date range limits
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2024-12-01');

    // Validate if the entered city is valid
   // Validate if the entered city is valid
    if (!validCities.map(city => city.toLowerCase()).includes(city.toLowerCase())) {
        alert('Please enter a valid city (in Texas or California).');
        return false;
    }

    // Clear previous error messages
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';

    // Validation checks
    if (!city) {
        errorMessageElement.textContent += "Please enter a city. ";
        return false;
    }

    if (!carType) {
        errorMessageElement.textContent += "Please select a car type. ";
        return false;
    }

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        errorMessageElement.textContent += "Please enter valid check-in and check-out dates. ";
        return false;
    }

    // Ensure check-in and check-out dates are within range
    if (checkIn < minDate || checkIn > maxDate) {
        errorMessageElement.textContent += "Check-in date must be between September 1, 2024, and December 1, 2024. ";
        return false;
    }

    if (checkOut < minDate || checkOut > maxDate) {
        errorMessageElement.textContent += "Check-out date must be between September 1, 2024, and December 1, 2024. ";
        return false;
    }

    // Ensure check-out is after check-in
    if (checkOut <= checkIn) {
        errorMessageElement.textContent += "Check-out date must be after check-in date. ";
        return false;
    }

    // Clear error message if all validations pass
    errorMessageElement.textContent = "";

    // Display the entered information
    const bookingInfo = `
        <h3>Booking Information:</h3>
        <p>City: ${city}</p>
        <p>Car Type: ${carType}</p>
        <p>Check-in Date: ${document.getElementById('check-in').value}</p>
        <p>Check-out Date: ${document.getElementById('check-out').value}</p>
    `;
    document.getElementById('booking-info').innerHTML = bookingInfo;

    return false; // Prevent form submission
}

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

