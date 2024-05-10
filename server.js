const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'website.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
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
        userData.push(newUser);

        fs.writeFile(dataPath, JSON.stringify(userData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to userData.json:', writeErr);
                return res.status(500).send('Error saving user data');
            }
            res.send('Signup successful!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
