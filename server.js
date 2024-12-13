const express = require('express');
const mongoose = require('mongoose'); // Uncomment if you need MongoDB
const gameData = require('./model/gameData');
const URL = 'mongodb://127.0.0.1/337_game_db'; // Uncomment if MongoDB is needed

app = express();
const host = '127.0.0.1';
const port = 5000;

app.use(express.static(__dirname + "/public_html"));
start();

async function start() {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connection successful!");
    }catch (error) {
        console.error("Error during MongoDB connection:", error.message);
    }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

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