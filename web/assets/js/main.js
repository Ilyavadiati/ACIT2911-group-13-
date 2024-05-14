
function login() {
    // TODO: send http request to backend to login
    const user = {
        username: 'user',
        password: 'pass'
    };

    // store user in local storage
    setUser(user);
}

function setUser(user) {
    // store user in local storage
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    // get user from local storage
    return JSON.parse(localStorage.getItem('user'));
}
