const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Uncomment if you need MongoDB
const gameData = require('./model/gameData');
const URL = 'mongodb://127.0.0.1/337_game_db'; // Uncomment if MongoDB is needed

const app = express();
const port = 5000;
const host = '127.0.0.1';

// used for parsing information to store in the database
app.use(express.json());
app.use(express.static('public_html'));

// Root route, NOT WORKING?
app.get('/', async function (req, res) {
    console.log("GET request received at /"); // Debugging log
    res.sendFile(path.join(__dirname, "public_html/index.html"));
    console.log("HTML file sent for / route");  // Log after sending the HTML file
});

// Test route for /h, using instead until / route works
app.get('/h', async function (req, res) {
    console.log("GET request received at /h");  // Debugging log
    res.sendFile(path.join(__dirname, "public_html/index.html"));
    console.log("HTML file sent for /h route");  // Log after sending the HTML file
});

// POST route to save game data
app.post('/saveGame', async function (req, res) {
    const { username, score, grid } = req.body;

    try {
        // Create a new game data record and save it
        const newGameData = new GameData({
            user,
            score,
            grid,
        });

        await newGameData.save();
        console.log('Game data saved successfully!');
        res.status(201).send('Game data saved');
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).send('Error saving game data');
    }
});

// Start the server
console.log("Server is starting...");  // Added log for debugging
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});

// MongoDB connection (re-enable if necessary)
async function main() {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connection successful!");
    }catch (error) {
        console.error("Error during MongoDB connection:", error.message);
    }
}

// Call main() to connect to MongoDB
main();