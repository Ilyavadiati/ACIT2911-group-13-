document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('auth_form');
    form.addEventListener('submit', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault();
        } else {
            // Simulate form submission to server
            // For demonstration, we use setTimeout to mimic asynchronous behavior like a server response
            setTimeout(() => {
                window.location.href = '/login.html'; // Redirect to login page on successful sign-up
            }, 1000); // Delay for demonstration purposes
        }
    });

    function validateForm() {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Check for empty fields
        if (!username || !email || !password) {
            alert('All fields must be filled out.');
            return false;
        }

        // Check email is correct format
        if (!email.endsWith('@my.bcit.ca')) {
            alert('Email must end with @my.bcit.ca');
            return false;
        }

        // Check for strong password
        if (!isStrongPassword(password)) {
            alert('Please create a strong password. Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }

        return true;
    }

    function isStrongPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
});

