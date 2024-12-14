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

app.get('/leaderboard', async function (req, res) {
    try {
        const scores = await gameData.find({});

        let scoresArray = {};

        for (let ii = 0; ii < scores.length; ii ++){
            if (scores[ii]['username'] in scoresArray){
                if (scores[ii]['score'] > scoresArray[scores[ii]['username']]){
                    scoresArray[scores[ii]['username']] = scores[ii]['score'];
                }
            } else {
                scoresArray[scores[ii]['username']] = scores[ii]['score'];
            }
        }

        let sortedScores = Object.fromEntries(
            Object.entries(scoresArray).sort(([,a],[,b]) => b - a)
        );

        let top10 = Object.entries(sortedScores).slice(0, 10);

        res.status(200).json(top10);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})