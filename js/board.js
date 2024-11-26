class Board{
    
    constructor(){
        board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        score = 0;
        tileNum = 0;
    }

    moveLeft(){
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
                    } else if (currentIndex + 1 == jj){
                        combined = false;
                    } else {
                        board[ii][currentIndex + 1] = board[ii][jj];
                        board[ii][jj] = 0;
                        combined = false;
                    }
                }
            }

        }
        addTile();
    }

    moveRight(){
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
                    } else if (currentIndex - 1 == jj){
                        combined = false;
                    } else {
                        board[ii][currentIndex - 1] = board[ii][jj];
                        board[ii][jj] = 0;
                        combined = false;
                    }
                }
            }

        }
        addTile();
    }

    moveDown(){
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
                        board[currentIndex][ii] = down * 2;
                        board[jj][ii] = 0;
                        score +=  board[currentIndex][ii];
                        tileNum --;
                        combined = true;
                    } else if (currentIndex - 1 == jj){
                        combined = false;
                    } else {
                        board[currentIndex - 1][ii] = board[jj][ii];
                        board[jj][ii] = 0;
                        combined = false;
                    }
                }
            }

        }
        addTile();
    }

    moveUp(){
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
                    } else if (currentIndex + 1 == jj){
                        combined = false;
                    } else {
                        board[currentIndex + 1][ii] = board[jj][ii];
                        board[jj][ii] = 0;
                        combined = false;
                    }
                }
            }

        }
        addTile();
    }

    addTile(){
        x = Math.floor(Math.random() * (boardX));
		y = Math.floor(Math.random() * (boardY));

		while(board.get(y).get(x) != 0){
			x = Math.floor(Math.random() * (boardX));
			y = Math.floor(Math.random() * (boardY));
		}

		chanceOf4 = Math.random();
		if (chanceOf4 >= 0.9){
            board[y][x] = 4;
		} else {
            board[y][x] = 2;
		}

		tileNum++;
    }

    getScore(){
		return score;
	}

	isFull(){
		return tileNum == 16;
	}

	toString(){
		out = "┌" + "----".repeat(3) + "---┐";
		for (ii = 0; ii < 4; ii++){
			out += "\n|";
			for (jj = 0; jj < 4; jj++){
				if (board[ii][jj] != 0){
					out += " " + board[ii][jj] + " |";
				} else {
					out += " " + " " + " |";
				}
			}
			if (ii != 3){
    			out += "\n|" + "---+".repeat(3) + "---|";
			}
		}
		out += "\n└" + "----".repeat(3) + "---┘";
		return out;
	}
}