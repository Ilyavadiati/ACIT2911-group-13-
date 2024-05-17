const { setUser, getUser } = require('../web/assets/js/userSession'); // Adjust the path as necessary

describe('User Storage Functions', () => {
    beforeEach(() => {
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn()
        };

        // Clear all instances and calls to the localStorage mock before each test
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('setUser stores user data in localStorage', () => {
        const user = { name: 'John Doe', email: 'john.doe@example.com' };

        setUser(user);

        // Check if localStorage.setItem was called with correct arguments
        expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
    });

    test('getUser retrieves user data from localStorage', () => {
        const user = { name: 'John Doe', email: 'john.doe@example.com' };

        // Mock the localStorage.getItem method
        localStorage.getItem = jest.fn(() => JSON.stringify(user));

        const retrievedUser = getUser();

        // Check if localStorage.getItem was called with correct arguments
        expect(localStorage.getItem).toHaveBeenCalledWith('user');
        expect(retrievedUser).toEqual(user);
    });
});
