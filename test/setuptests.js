global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn()
};

global.alert = jest.fn();
global.fetch = jest.fn();
global.Date = jest.fn(() => ({
    getTime: () => 123456789,
    toISOString: () => '2024-01-01T00:00:00.000Z'
}));
Date.now = jest.fn(() => 123456789);
