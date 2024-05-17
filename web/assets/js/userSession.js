function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));  // Store user data in local storage
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));  // Retrieve user data from local storage
}

module.exports = {
    setUser,
    getUser
};
