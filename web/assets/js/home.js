import { getUser } from './userSession.js';

document.addEventListener('DOMContentLoaded', function() {
    const user = getUser();
    if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('signup').style.display = 'none';
        document.getElementById('user').innerHTML = `Hi, ${user.username}`;
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('signup').style.display = 'block';
        document.getElementById('user').innerHTML = "";
        document.getElementById('logout').style.display = 'none';
    }
});

document.getElementById('logout').addEventListener('click', function(event) {
    localStorage.removeItem('user');
    window.location.href = '/';
});

// redirect to the account page
document.getElementById('user').addEventListener('click', function(event) {
    const user = getUser();
    if (user) {
        window.location.href = `/account/${user.username}`;
    }
});