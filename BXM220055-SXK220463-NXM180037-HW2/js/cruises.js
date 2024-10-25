$(document).ready(function() {
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
        $('#date-time').text(formattedDateTime);
    }

    // Call displayDateTime every second
    setInterval(displayDateTime, 1000);

    // List of valid cruise destinations
    const validCruiseDestinations = ["Alaska", "Bahamas", "Europe", "Mexico"];

    // Function to calculate the number of rooms required
    function calculateRooms(adults, children) {
        const totalGuests = adults + children;
        return Math.ceil(totalGuests / 2); // Each room can accommodate 2 guests
    }

    // Function to validate the cruise form
    function validateCruiseForm() {
        const destination = $('#destination').val();
        const departingDate = $('#departing-date').val();
        const duration = parseInt($('#duration').val(), 10) || 0;
        const adults = parseInt($('#adults').val(), 10) || 0;
        const children = parseInt($('#children').val(), 10) || 0;
        const infants = parseInt($('#infants').val(), 10) || 0;

        let errorMessages = "";

        // Validate destination
        if (!validCruiseDestinations.includes(destination)) {
            errorMessages += '<p>Please select a valid destination (Alaska, Bahamas, Europe, Mexico).</p>';
        }

        // Validate departing date (must be between Sep 1, 2024 and Dec 1, 2024)
        const minDate = new Date("2024-09-01");
        const maxDate = new Date("2024-12-01");
        const selectedDate = new Date(departingDate);
        if (selectedDate < minDate || selectedDate > maxDate) {
            errorMessages += '<p>Please select a departing date between Sep 1, 2024, and Dec 1, 2024.</p>';
        }

        // Validate duration (must be between 3 and 10 days)
        if (duration < 3 || duration > 10) {
            errorMessages += '<p>Duration of the cruise must be between 3 and 10 days.</p>';
        }

        // If any error is present, display the error message and prevent form submission
        if (errorMessages) {
            $('#error-messages').html(errorMessages);
            $('#booking-info').empty(); // Clear any previous booking info
            return false;
        }

        // Calculate the number of rooms required
        const roomsNeeded = calculateRooms(adults, children);

        // If everything is valid, display the entered information
        displayCruiseInfo(destination, departingDate, duration, adults, children, infants, roomsNeeded);
        return false; // Prevent form submission for demonstration purposes
    }

    // Function to display the cruise booking information on the webpage
    function displayCruiseInfo(destination, departingDate, duration, adults, children, infants, roomsNeeded) {
        console.log("Display function called"); // Debug message
        
        const cruiseInfo = `
            <h3>Cruise Booking Information</h3>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Departing Date:</strong> ${departingDate}</p>
            <p><strong>Duration:</strong> ${duration} days</p>
            <p><strong>Adults:</strong> ${adults}</p>
            <p><strong>Children:</strong> ${children}</p>
            <p><strong>Infants:</strong> ${infants}</p>
            <p><strong>Number of Rooms Needed:</strong> ${roomsNeeded}</p>
        `;
        
        $('#booking-info').html(cruiseInfo);
        console.log("Cruise info HTML updated"); // Debug message
        $('#error-messages').empty(); // Clear any previous error messages
    }

    // Event listener for form submission
    $('#cruise-form').on('submit', function() {
        return validateCruiseForm();
    });
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
