import { setUser } from './userSession.js';

document.getElementById('login-submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            setUser({ email: data.email, username: data.username }); 
            window.location.href = '/';     
        } else {
            alert('Login failed: ' + data.message);  // Display error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);  // Display error message
    });
});


document.getElementById('show-password').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});
