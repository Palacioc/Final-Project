/*jshint esversion:6*/

const mongoose = require('mongoose');

// connect to the database
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});
