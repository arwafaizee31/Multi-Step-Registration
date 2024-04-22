const mongoose = require("mongoose");
const connectionString = 'mongodb://localhost:27017/test';
mongoose.connect(connectionString);
  const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;