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
	
	// Validate Gender
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById('gender-error').textContent = "Please select a gender.";
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
