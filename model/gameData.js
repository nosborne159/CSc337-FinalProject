const mongoose = require('mongoose');

// creating the userSchema to hold the user's associated data
const userSchema= new mongoose.Schema({
    username: String,
    highScore: Number,
    grid: [[Number]]
});


const userData = mongoose.model('user', userSchema);
module.exports = userData;