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

// Function to generate the room options based on the number of guests
function generateRoomOptions() {
    const adults = parseInt(document.getElementById('adults').value, 10) || 0;
    const children = parseInt(document.getElementById('children').value, 10) || 0;
    const totalGuests = adults + children;
    
    const roomsSelect = document.getElementById('rooms');

    // Clear previous room options
    roomsSelect.innerHTML = '';

    // Create a default "Select number of rooms" option
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select number of rooms';
    defaultOption.value = '';
    roomsSelect.appendChild(defaultOption);


    // If total guests are more than 2, calculate minimum rooms needed
    if (totalGuests > 2) {
        const minRooms = Math.ceil(totalGuests / 2);

        // Populate room options, starting from the minimum rooms needed
        for (let i = minRooms; i <= minRooms + 2; i++) {
            const option = document.createElement('option');
            option.text = `${i} room${i > 1 ? 's' : ''}`;
            option.value = i;
            roomsSelect.appendChild(option);
        }

        // Enable the dropdown once options are populated
        roomsSelect.disabled = false;
    } else {
        // If total guests <= 2, only 1 room is needed
        const option = document.createElement('option');
        option.text = `1 room`;
        option.value = 1;
        roomsSelect.appendChild(option);
        
        // Disable the dropdown since only 1 room is needed
        roomsSelect.disabled = true;
    }
}

// Function to update the minimum check-out date based on the selected check-in date
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
        
        // Check if the minimum date is outside the max limit
        checkOutInput.max = "2024-12-02"; // Set maximum check-out date to 2024-12-01

        // If the current check-out date is before the new minimum, reset it
        if (checkOutInput.value < minCheckOutDate || checkOutInput.value > checkOutInput.max) {
            checkOutInput.value = '';
        }
    }
});

// List of valid cities in Texas and California
const validCities = ["Dallas", "Houston", "Austin", "San Antonio", "Fort Worth", 
    "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo", "Los Angeles", 
    "San Francisco", "San Diego", "San Jose", "Fresno", "Sacramento", "Long Beach", 
    "Oakland", "Bakersfield", "Anaheim"];


// Function to validate the form on submission
function validateStaysForm() {
    const city = document.getElementById('city').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const adults = parseInt(document.getElementById('adults').value, 10) || 0;
    const children = parseInt(document.getElementById('children').value, 10) || 0;
    const infants = parseInt(document.getElementById('infants').value, 10) || 0;
    const rooms = document.getElementById('rooms').value;
    
    const totalGuests = adults + children;

    // Ensure all fields are filled
    if (!city || !checkIn || !checkOut || !rooms) {
        alert('Please fill in all the required fields.');
        return false;
    }

    // Validate if the entered city is valid
    if (!validCities.map(city => city.toLowerCase()).includes(city.toLowerCase())) {
        alert('Please enter a valid city (in Texas or California).');
        return false;
    }

    // Validate if selected rooms are sufficient for the number of guests
    if (rooms < Math.ceil(totalGuests / 2)) {
        alert(`You need at least ${Math.ceil(totalGuests / 2)} rooms for ${totalGuests} guests.`);
        return false;
    }

    // If everything is valid, display the entered information
    displayBookingInfo(city, checkIn, checkOut, adults, children, infants, rooms);

    return false; // Prevent form submission for demonstration purposes
}

// Function to display booking info on the webpage
function displayBookingInfo(city, checkIn, checkOut, adults, children, infants, rooms) {
    const bookingInfo = `
        <h3>Booking Information</h3>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Check-in Date:</strong> ${checkIn}</p>
        <p><strong>Check-out Date:</strong> ${checkOut}</p>
        <p><strong>Adults:</strong> ${adults}</p>
        <p><strong>Children:</strong> ${children}</p>
        <p><strong>Infants:</strong> ${infants}</p>
        <p><strong>Number of Rooms:</strong> ${rooms}</p>
    `;
    
    document.getElementById('booking-info').innerHTML = bookingInfo;
}

// Event listeners for dynamic room generation
document.getElementById('adults').addEventListener('input', generateRoomOptions);
document.getElementById('children').addEventListener('input', generateRoomOptions);

// Initial room generation on page load
generateRoomOptions();

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
