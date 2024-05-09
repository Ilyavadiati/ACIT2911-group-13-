document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collecting form data
        const data = {
            firstName: document.getElementById('fname').value.trim(),
            lastName: document.getElementById('lname').value.trim(),
            phoneEmail: document.getElementById('phoneemail').value.trim(),
            password: document.getElementById('newpass').value,
            birthMonth: document.getElementById('selmonth').value,
            birthDay: document.getElementById('selday').value,
            birthYear: document.getElementById('selyear').value,
            gender: document.querySelector('input[type="radio"]:checked') ? document.querySelector('input[type="radio"]:checked').value : null
        };

        // More detailed client-side validation
        if (!data.firstName) {
            alert('Please enter your first name.');
            return;
        }
        if (!data.lastName) {
            alert('Please enter your last name.');
            return;
        }
        if (!data.phoneEmail) {
            alert('Please enter your phone number or email address.');
            return;
        }
        if (!data.password) {
            alert('Please create a password.');
            return;
        }
        if (data.birthMonth === "Select Month") {
            alert('Please select your birth month.');
            return;
        }
        if (data.birthDay === "Select Day") {
            alert('Please select your birth day.');
            return;
        }
        if (data.birthYear === "Select Year") {
            alert('Please select your birth year.');
            return;
        }
        if (!data.gender) {
            alert('Please select your gender.');
            return;
        }

        // Sending data to the server using Fetch API
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Corrected Content-Type
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())  // Assuming the server responds with JSON
        .then(responseData => {
            alert(responseData.message);  // Display success message from server
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending your data.');
        });
    });
});
