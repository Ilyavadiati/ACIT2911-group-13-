const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const getDb = require('./db');
const mongoose = require('./db');
const User = require('./module/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



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

// app.get('/api/reviews', async (req, res) => {
//     const db = await getDb;
//     const data = await db.collection('reviews').find({}).toArray();
//     res.send(data);
// });

// Define a schema for "reviews"
const reviewSchema = new mongoose.Schema({
    _id: String, // Assuming MongoDB default _id is overridden by your custom id
    date: Date,
    username: String,
    course: String,
    instructor: String,
    rating: Number,
    comment: String
}, { collection: 'reviews' });

const Review = mongoose.model('Review', reviewSchema);

app.get('/api/reviews', async (req, res) => {
    try {
        const data = await Review.find(); // Fetch all documents
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching reviews: ' + error.message);
    }
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
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(() => res.send('Signup successful!'))
        .catch(err => {
            console.error('Error saving user to database:', err);
            if (err.code === 11000) { // Handle duplicate key error
                return res.status(400).send('Username or email already exists.');
            }
            res.status(500).send('Error signing up');
        });
});





app.post('/rating', (req, res) => {
    const newRating = new Review({
        _id: req.body._id,
        username: req.body.username,
        course: req.body.course,
        instructor: req.body.instructor,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date(req.body.date) 
    });

    newRating.save() // Saving the new rating document in the database
        .then(() => res.send('Rating submitted successfully!'))
        .catch(err => {
            console.error('Error saving the rating', err);
            res.status(500).send('Failed to submit rating');
        });
});


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for user authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
    
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serialize user into the sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Login route
app.post('/api/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            // Assuming `info` contains the reason for authentication failure
            return res.status(401).json(info);
        }
        // Manually establish the login session
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.json({
                success: true,
                email: user.email,
                username: user.username,
            }); // Send the user information as JSON
        });
    })(req, res);
});

// Failure route
app.get('/login-failure', (req, res) => {
    res.status(401).json({ success: false, message: 'Invalid username or password.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Account route
app.get('/account/:username', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'web/account', 'account.html'));
    } catch (error) {
        res.status(500).send('Error fetching reviews: ' + error.message);
    }
});


app.get('/api/account/:username', async (req, res) => {
    try {
        const data = await Review.find({ username: req.params.username });
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching reviews: ' + error.message);
    }
});

app.put('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send('Review not found');
        }
        review.rating = req.body.rating;
        review.comment = req.body.comment;
        await review.save();
        res.send(review);
    } catch (error) {
        res.status(500).send('Error updating review: ' + error.message);
    }
});


// Delete route
app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send('Review not found');
        }
        await review.deleteOne();
        res.send(review);
    } catch (error) {
        res.status(500).send('Error deleting review: ' + error.message);
    }
});
