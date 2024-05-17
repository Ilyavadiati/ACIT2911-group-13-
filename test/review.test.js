// reviews.test.js
const { JSDOM } = require('jsdom');
const { renderReviews, generateRatingStars } = require('../web/assets/js/reviews');


// Create a basic HTML structure
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <div id="reviews-list"></div>
</body>
</html>
`;

// Set up the DOM environment
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;

// Mock the fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve([
            {
                _id: "1",
                date: "2024-05-17T00:00:00.000Z",
                username: "testuser",
                course: "Test Course",
                rating: 5,
                comment: "This is a test comment."
            }
        ])
    })
);

// Unit test for the fetch and render functionality
describe('Reviews Fetch and Render', () => {
    beforeAll(() => {
        document.body.innerHTML = `<div id="reviews-list"></div>`;
    });

    it('fetches and renders reviews', async () => {
        // Assuming your fetch call happens on load or some event, you can call it directly here
        await fetch("/api/reviews").then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    renderReviews(data);
                });
            }
        });

        // Test the rendering
        const reviewsList = document.getElementById('reviews-list');
        expect(reviewsList.children.length).toBe(1);

        const reviewDiv = reviewsList.children[0];
        expect(reviewDiv.querySelector('.font-medium.text-lg').textContent).toBe('testuser');
        expect(reviewDiv.querySelector('.font-normal.text-base').textContent).toBe('This is a test comment.');
        expect(reviewDiv.querySelector('img').alt).toBe('testuser image');
    });
});

// Test cases for generateRatingStars function
describe('generateRatingStars', () => {
    it('generates 5 filled stars for a rating of 5', () => {
        const starsHtml = generateRatingStars(5);
        const filledStarsCount = (starsHtml.match(/#FBBF24/g) || []).length;
        const emptyStarsCount = (starsHtml.match(/#E5E7EB/g) || []).length;
        expect(filledStarsCount).toBe(5);
        expect(emptyStarsCount).toBe(0);
    });

    it('generates 3 filled stars and 2 empty stars for a rating of 3', () => {
        const starsHtml = generateRatingStars(3);
        const filledStarsCount = (starsHtml.match(/#FBBF24/g) || []).length;
        const emptyStarsCount = (starsHtml.match(/#E5E7EB/g) || []).length;
        expect(filledStarsCount).toBe(3);
        expect(emptyStarsCount).toBe(2);
    });

    it('generates 0 filled stars and 5 empty stars for a rating of 0', () => {
        const starsHtml = generateRatingStars(0);
        const filledStarsCount = (starsHtml.match(/#FBBF24/g) || []).length;
        const emptyStarsCount = (starsHtml.match(/#E5E7EB/g) || []).length;
        expect(filledStarsCount).toBe(0);
        expect(emptyStarsCount).toBe(5);
    });

});



