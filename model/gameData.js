const mongoose = require('mongoose');

// creating the userSchema to hold the user's associated data
const gameDataSchema= new mongoose.Schema({
    username: String,
    score: Number,
    grid: [[Number]],
});

const userData = mongoose.model('gameData', gameDataSchema);

module.exports = userData;