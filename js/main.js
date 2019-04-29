/*----- constants -----*/ 
var theBoard;
const players = {
player1 : 'X',
player2 : 'O'
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
 


/*----- app's state (variables) -----*/ 

var board, winner, turn;


/*----- cached element references -----*/ 

const cells = document.querySelectorAll('.cell');


/*----- event listeners -----*/ 

document.getElementById('square')
.addEventListener('click', whenClicked);

/*----- functions -----*/

function beginGame() {
document.querySelector(".finished").style.display = "none";
theBoard = Array.from(Array(9).keys());
for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', whenClicked, false);
}
}

function whenClicked(square) {
 if (typeof theBoard[square.target.id] == 'number') {
 turn(square.target.id, players);
//checking for tie
if(!checkTie()) turn(nextTurn(), players);
 }
}

function turn(squareId, players) {
    theBoard[squareId] = players;
document.getElementById(squareId).innerText = players;
let gameIsWon = checkForWinner(theBoard, players)
if (gameIsWon) gameOver(gameIsWon)
}

function checkForWinner(board, player) {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameIsWon = null;
    for (let [index, win] of winningCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameIsWon = {index: index, player: player};
        break;
      }
    }
    return gameIsWon;
}

function gameOver(gameIsWon) {
    for (let index of winningCombos[gameIsWon.index]) {
        document.getElementById(index).style.backgroundColor = gameIsWon.player == player1 ? "pink" : "blue";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', whenClicked, false);
    }
    declareWinner(gameIsWon.player == player1 ? "X wins!" : "O is the winner!")
}

function declareWinner(winner) {
    document.querySelector(".finished").style.display = "block";
    document.querySelector(".finished .text").innerText = winner;
}

function emptySquares() {
    return theBoard.filter(s => typeof s == 'number');
}

function nextTurn() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0)
    for (var i = 0; i < cells.length; i++) {
     cells[i].style.backgroundColor = "purple";
     cells[i].removeEventListener('click', whenClicked, false); 
    }
    declareWinner("It's a Tie!")
    return true;
    }