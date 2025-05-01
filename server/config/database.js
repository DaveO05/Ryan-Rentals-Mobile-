const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/RyanRentals', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected successfully'); // Log success
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err); // Log connection error
      process.exit(1); // Exit if connection fails
    });
};

module.exports = connectDB;
