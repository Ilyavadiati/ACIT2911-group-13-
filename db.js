const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/bcit'; // Include the database name directly in the URL

mongoose.connect(url)
  .then(() => console.log('MongoDB connected with Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;


// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// let getDb = client.connect().then((c) => c.db('bcit'));

// module.exports = getDb;
