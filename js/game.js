import board from "./board";

function start(){
    const board = new board();
    board.addTile();
    board.addTile();
}

function restart(){
    board.clear();
    board.addTile();
    board.addTile();
}

function moveUp(){
    board.moveUp();
    console.log("hello");
}

function moveDown(){
    board.moveDown();
}

function moveLeft(){
    board.moveLeft();
}

function moveRight(){
    board.moveRight();
}