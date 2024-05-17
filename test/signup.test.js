// signup.test.js
const { JSDOM } = require('jsdom');

let validateForm, isStrongPassword, initializeSignupForm;

beforeAll(() => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Test</title></head>
        <body>
            <form id="auth_form">
                <input type="text" id="username" name="username" value="">
                <input type="text" id="email" name="email" value="">
                <input type="password" id="password" name="password" value="">
                <button id="signup-submit">Sign Up</button>
            </form>
        </body>
        </html>
    `);
    global.document = dom.window.document;
    global.window = dom.window;
    global.alert = jest.fn(); // Mock alert

    // Now import the module after setting up the DOM
    ({ validateForm, isStrongPassword, initializeSignupForm } = require('../web/assets/js/signup'));
});

describe('Form Validation', () => {
    beforeEach(() => {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        alert.mockClear(); // Clear mock state before each test
    });

    test('validateForm should return false if any field is empty', () => {
        document.getElementById('username').value = '';
        document.getElementById('email').value = 'test@my.bcit.ca';
        document.getElementById('password').value = 'StrongP@ssword1';
        expect(validateForm()).toBe(false);
        expect(alert).toHaveBeenCalledWith('All fields must be filled out.');

        document.getElementById('username').value = 'testuser';
        document.getElementById('email').value = '';
        expect(validateForm()).toBe(false);
        expect(alert).toHaveBeenCalledWith('All fields must be filled out.');

        document.getElementById('email').value = 'test@my.bcit.ca';
        document.getElementById('password').value = '';
        expect(validateForm()).toBe(false);
        expect(alert).toHaveBeenCalledWith('All fields must be filled out.');
    });

    test('validateForm should return false if email does not end with @my.bcit.ca', () => {
        document.getElementById('username').value = 'testuser';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('password').value = 'StrongP@ssword1';
        expect(validateForm()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Email must end with @my.bcit.ca');
    });

    test('validateForm should return false if password is not strong', () => {
        document.getElementById('username').value = 'testuser';
        document.getElementById('email').value = 'test@my.bcit.ca';
        document.getElementById('password').value = 'weakpassword';
        expect(validateForm()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Please create a strong password. Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    });

    test('validateForm should return true if all fields are valid', () => {
        document.getElementById('username').value = 'testuser';
        document.getElementById('email').value = 'test@my.bcit.ca';
        document.getElementById('password').value = 'StrongP@ssword1';
        expect(validateForm()).toBe(true);
        expect(alert).not.toHaveBeenCalled();
    });
});

// Test cases for isStrongPassword function
describe('Password Strength Validation', () => {
    beforeEach(() => {
        alert.mockClear(); // Clear mock state before each test
    });

    test('isStrongPassword should return true for a strong password', () => {
        expect(isStrongPassword('StrongP@ssword1')).toBe(true);
    });

    test('isStrongPassword should return false for a password without uppercase letters', () => {
        expect(isStrongPassword('weakp@ssword1')).toBe(false);
    });

    test('isStrongPassword should return false for a password without lowercase letters', () => {
        expect(isStrongPassword('WEAKP@SSWORD1')).toBe(false);
    });

    test('isStrongPassword should return false for a password without numbers', () => {
        expect(isStrongPassword('WeakP@ssword')).toBe(false);
    });

    test('isStrongPassword should return false for a password without special characters', () => {
        expect(isStrongPassword('WeakPassword1')).toBe(false);
    });

    test('isStrongPassword should return false for a password less than 8 characters', () => {
        expect(isStrongPassword('W@1a')).toBe(false);
    });
});
