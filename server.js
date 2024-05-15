const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const getDb = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/assets', express.static(path.join(__dirname, 'web/assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/home', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/login', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/signup', 'signup.html'));
});

app.get('/reviews', async (req, res) => {
    res.sendFile(path.join(__dirname, 'web/reviews', 'reviews.html'));
});

app.get('/api/reviews', async (req, res) => {
    const db = await getDb;
    const data = await db.collection('reviews').find({}).toArray();
    res.send(data);
});

app.get('/rating', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/rating', 'rating.html'));
});

// Ensure userData.json exists or create an empty one
const dataPath = path.join(__dirname, '/userData.json');
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
}

app.post('/signup', (req, res) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Consider hashing this before storing
        
    };

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the userData.json:', err);
            return res.status(500).send('Error reading user data');
        }
        let userData = JSON.parse(data);
        userData.users.push(newUser);

        fs.writeFile(dataPath, JSON.stringify(userData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to userData.json:', writeErr);
                return res.status(500).send('Error saving user data');
            }
            res.send('Signup successful!');
        });
    });
});

app.post('/rating', (req, res) => {
    const newRating = {
        rating: req.body.rating,
        course: req.body.course,
        comment: req.body.comment
    };
    // TODO: persist in db
    res.send('Rating submitted successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
