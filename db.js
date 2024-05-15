const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let getDb = client.connect().then((c) => c.db('bcit'));

module.exports = getDb;