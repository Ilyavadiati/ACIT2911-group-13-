document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('auth_form');
    const submitButton = document.getElementById('signup-submit');
    submitButton.addEventListener('click', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault();
        } else {
            fetch("/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: form.username.value,
                    email: form.email.value,
                    password: form.password.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
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