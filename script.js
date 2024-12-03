const gameBoard = document.getElementById('game-board');
const resultDiv = document.getElementById('result');
const twoPlayerButton = document.getElementById('two-player');
const vsComputerButton = document.getElementById('vs-computer');

let gameMode = ''; // 'two-player' or 'vs-computer'
let board = Array(9).fill(null); // Tic-Tac-Toe board (9 Felder)

function initializeBoard() {
    gameBoard.innerHTML = '';
    board = Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => makeMove(i));
        gameBoard.appendChild(cell);
    }
    resultDiv.innerHTML = ''; // Reset result
}

function makeMove(index) {
    if (board[index]) return; // If the cell is already filled, do nothing
    board[index] = gameMode === 'two-player' ? 'X' : 'O';
    updateBoard();
    if (checkWin()) {
        resultDiv.innerHTML = `${gameMode === 'two-player' ? 'Spieler' : 'Computer'} hat gewonnen!`;
        return;
    }
    if (gameMode === 'vs-computer' && board.includes(null)) {
        setTimeout(computerMove, 500); // Computerzug nach einer kurzen Verzögerung
    }
}

function updateBoard() {
    const cells = gameBoard.children;
    board.forEach((value, index) => {
        cells[index].innerText = value;
    });
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function computerMove() {
    const emptyCells = board.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = 'O';
    updateBoard();
    if (checkWin()) {
        resultDiv.innerHTML = 'Computer hat gewonnen!';
    }
}

twoPlayerButton.addEventListener('click', () => {
    gameMode = 'two-player';
    initializeBoard();
});

vsComputerButton.addEventListener('click', () => {
    gameMode = 'vs-computer';
    initializeBoard();
});

