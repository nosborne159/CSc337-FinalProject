function start(){
    board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    score = 0;
    tileNum = 0;
    highest = 4;
    addTile();
    addTile();
    updateTiles();
}

function restart(){
    let x = document.getElementsByClassName("hidden");
    for (let ii = 0; ii < x.length; ii++){
        x[ii].style.visibility = "hidden";
    }

    let y = document.getElementsByClassName("visible");
    for (let ii = 0; ii < y.length; ii++){
        y[ii].style.visibility = "visible";
    }
    console.log("restart clicked");
    clear();
    addTile();
    addTile();
    updateTiles();
}

function clear(){
    console.log("cleared");
    board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    score = 0;
    tileNum = 0;
}

function updateTiles(){
    for (let ii = 0; ii < 4; ii++){
        for (let jj = 0; jj < 4; jj++){
            if (board[ii][jj] == 0){
                document.getElementById("board").rows[ii].cells[jj].innerHTML = " ";
            } else {
                document.getElementById("board").rows[ii].cells[jj].innerHTML = board[ii][jj];
            }
        }
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function moveLeft(){
    moved = false;
    for (let ii = 0; ii < 4; ii++){
        combined = false;
        for (let jj = 0; jj < 4; jj++){
            if (board[ii][jj] == 0){
                continue;
            }
            currentIndex = jj-1;
            left = board[ii][currentIndex];
            while( left == 0 && currentIndex > 0){
                currentIndex--;
                if(currentIndex >= 0){
                    left = board[ii][currentIndex];
                }
            }
            if (left != 0){
                if (left == board[ii][jj] && !combined){
                    board[ii][currentIndex] = left * 2;
                    board[ii][jj] = 0;
                    score +=  board[ii][currentIndex];
                    tileNum --;
                    combined = true;
                    moved = true;
                    if (board[ii][currentIndex]>highest){
                        highest = board[ii][currentIndex];
                    }
                } else if (currentIndex + 1 == jj){
                    combined = false;
                } else {
                    board[ii][currentIndex + 1] = board[ii][jj];
                    board[ii][jj] = 0;
                    combined = false;
                    moved = true;
                }
            } else {
                board[ii][currentIndex] = board[ii][jj];
                board[ii][jj] = 0;
                combined = false;
                if (currentIndex != jj){
                    moved = true;
                }
            }
        }

    }
    if (moved){
        addTile();
    }
    updateTiles();
    isOver();
    return moved;
}

function moveRight(){
    moved = false;
    for (let ii = 0; ii < 4; ii++){
        combined = false;
        for (let jj = 2; jj >= 0; jj--){
            if (board[ii][jj] == 0){
                continue;
            }
            currentIndex = jj+1;
            right = board[ii][currentIndex];
            while( right == 0 && currentIndex < 3){
                currentIndex++;
                if(currentIndex <= 3){
                    right = board[ii][currentIndex];
                }
            }
            if (right != 0){
                if (right == board[ii][jj] && !combined){
                    board[ii][currentIndex] = right * 2;
                    board[ii][jj] = 0;
                    score +=  board[ii][currentIndex];
                    tileNum --;
                    combined = true;
                    moved = true;
                    if (board[ii][currentIndex]>highest){
                        highest = board[ii][currentIndex];
                    }
                } else if (currentIndex - 1 == jj){
                    combined = false;
                } else {
                    board[ii][currentIndex - 1] = board[ii][jj];
                    board[ii][jj] = 0;
                    combined = false;
                    moved = true;
                }
            } else {
                board[ii][currentIndex] = board[ii][jj];
                board[ii][jj] = 0;
                combined = false;
                if (currentIndex != jj){
                    moved = true;
                }
            }
        }

    }
    if (moved){
        addTile();
    }
    updateTiles();
    isOver();
    return moved;
}

function moveDown(){
    moved = false;
    for (let ii = 0; ii < 4; ii++){
        combined = false;
        for (let jj = 2; jj >= 0; jj--){
            if (board[jj][ii] == 0){
                continue;
            }
            currentIndex = jj+1;
            down = board[currentIndex][ii];
            while (down == 0 && currentIndex < 3){
                currentIndex++;
                if(currentIndex < 4){
                    down = board[currentIndex][ii];
                }
            }
            if (down != 0){
                if (down == board[jj][ii] && !combined){
                    board[currentIndex][ii] *= 2;
                    board[jj][ii] = 0;
                    score +=  board[currentIndex][ii];
                    tileNum --;
                    combined = true;
                    moved = false;
                    if (board[currentIndex][ii]>highest){
                        highest = board[currentIndex][ii];
                    }
                } else if (currentIndex - 1 == jj){
                    combined = false;
                } else {
                    board[currentIndex - 1][ii] = board[jj][ii];
                    board[jj][ii] = 0;
                    combined = false;
                    moved = true;
                }
            } else {
                board[currentIndex][ii] = board[jj][ii];
                board[jj][ii] = 0;
                combined = false;
                if (currentIndex != jj){
                    moved = true;
                }
            }
        }

    }
    if (moved){
        addTile();
    }
    updateTiles();
    isOver();
    return moved;
}

function moveUp(){
    moved = false;
    for (let ii = 0; ii < 4; ii++){
        combined = false;
        for (let jj = 1; jj < 4; jj++){
            if (board[jj][ii] == 0){
                continue;
            }
            currentIndex = jj-1;
            up = board[currentIndex][ii];
            while (up == 0 && currentIndex > 0){
                currentIndex--;
                if(currentIndex >= 0){
                    up = board[currentIndex][ii];
                }
            }
            if (up != 0){
                if (up == board[jj][ii] && !combined){
                    board[currentIndex][ii] = up * 2;
                    board[jj][ii] = 0;
                    score +=  board[currentIndex][ii];
                    tileNum --;
                    combined = true;
                    moved = true;
                    if (board[currentIndex][ii]>highest){
                        highest = board[currentIndex][ii];
                    }
                } else if (currentIndex + 1 == jj){
                    combined = false;
                } else {
                    board[currentIndex + 1][ii] = board[jj][ii];
                    board[jj][ii] = 0;
                    combined = false;
                    moved = true;
                }
            } else {
                board[currentIndex][ii] = board[jj][ii];
                board[jj][ii] = 0;
                combined = false;
                if (currentIndex != jj){
                    moved = true;
                }
            }
        }

    }
    if (moved){
        addTile();
    }
    updateTiles();
    isOver();
    return moved;
}

function addTile(){ 

    x = Math.floor(Math.random() * (4));
    y = Math.floor(Math.random() * (4));

    while(board[y][x] != 0){
        x = Math.floor(Math.random() * (4));
        y = Math.floor(Math.random() * (4));
    }

    chanceOf4 = Math.random();
    if (chanceOf4 >= 0.9){
        board[y][x] = 4;
    } else {
        board[y][x] = 2;
    }

    tileNum++;
}

function isOver(){
    if (highest == 2048 || (tileNum > 15 && !canMove())){
        // end game
        console.log("Game Over");
        // store score, username, board

        // hide buttons
        // say game over
        // unhide reset button
        // Example of how you might call the function
        
        let x = document.getElementsByClassName("hidden");
        for (let ii = 0; ii < x.length; ii++){
            x[ii].style.visibility = "visible";
        }

        let y = document.getElementsByClassName("visible");
        for (let ii = 0; ii < y.length; ii++){
            y[ii].style.visibility = "hidden";
        }
        document.getElementById("submitButton").style.visibility = "visible"
    } 
}

function submitStuff(){
    let user = document.getElementById("userName");
    const username = user.value;
    // save the game information to the associated userName
    saveGameData(username, score, board);
    document.getElementById("submitButton").style.visibility = "hidden";
    document.getElementById("userName").style.visibility = "hidden";
    document.getElementById("resetButton").style.visibility = "visible";
}

async function showLeaderboard(){
    if (document.getElementById("leaderboardToggle").innerText == '1'){
        try {
            let response = await fetch("http://127.0.0.1:5000/leaderboard");
            
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            let text = "";
    
            for (let ii = 0; ii < json.length; ii++){
                text = text + (ii + 1) + ". " + json[ii][0] + ":" +json[ii][1] + "\n";
            }
    
            document.getElementById("LeaderBoard").innerText = text;
    
            console.log("Got Leaderboard");
          } catch (error) {
            console.error(error.message);
          }
          document.getElementById("leaderboardToggle").innerText = 0;
    } else {
        document.getElementById("LeaderBoard").innerText = "";
        document.getElementById("leaderboardToggle").innerText = 1;
    }
}

function canMove(){
    movement = false;
    for (ii = 0; ii < 4; ii++){
        for (jj = 0; jj < 4; jj++){
            tmp = false;
            // check left
            if (jj == 0){
                // out of bounds
                tmp = tmp || false;
            } else {
                tmp = tmp || checkNextTo(0, -1, ii, jj);
            }
            // check right
            if (jj == 3){
                // out of bounds
                tmp = tmp || false;
            } else {    
                tmp = tmp || checkNextTo(0, 1, ii, jj);
            }
            // check up
            if (ii == 0){
                // out of bounds
                tmp = tmp || false;
            } else {
                tmp = tmp || checkNextTo(-1, 0, ii, jj);
            }
            // check down
            if (ii == 3){
                // out of bounds
                tmp = tmp || false;
            } else {
                tmp = tmp || checkNextTo(1, 0, ii, jj);
            }
            movement = movement || tmp;
        }
    }
    return movement;
}

function checkNextTo(y, x, ii, jj){
    return board[ii+y][jj+x] == board[ii][jj] || board[ii+y][jj+x] == 0;
}

function getScore(){
    return score;
}

// database handling 
async function saveGameData(username, score, grid) {
    const gameData = {
        username: username,
        score: score,
        grid: grid
    };
    try {
        let response = await fetch("http://127.0.0.1:5000/saveGame", {
            body: JSON.stringify(gameData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
}

function end_game(){
    highest = 2048;
    isOver();
}

