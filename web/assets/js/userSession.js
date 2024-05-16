export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));  // Store user data in local storage
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));  // Retrieve user data from local storage
}
