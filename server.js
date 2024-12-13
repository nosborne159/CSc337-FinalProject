const express = require('express');
const mongoose = require('mongoose'); // Uncomment if you need MongoDB
const gameData = require('./model/gameData');
const URL = 'mongodb://127.0.0.1/337_game_db'; // Uncomment if MongoDB is needed

app = express();
const host = '127.0.0.1';
const port = 5000;

app.use(express.json());
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
    const {username, score, grid} = req.body;
    try{
        let data = new gameData({
            username: username,
            score: score,
            grid : grid,
        });
        await data.save();
        res.status(200);
    } catch (err) {
        console.error('Error saving game data:', err);
        res.status(500);
    }   
});