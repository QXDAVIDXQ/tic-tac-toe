const gameBoard = document.getElementById('game-board');
const resultDiv = document.getElementById('result');
const twoPlayerButton = document.getElementById('two-player');
const vsComputerButton = document.getElementById('vs-computer');

let gameMode = ''; // 'two-player' or 'vs-computer'
let currentPlayer = 'X'; // 'X' starts first
let board = Array(9).fill(null); // Tic-Tac-Toe board (9 Felder)
let gameOver = false; // Flag, ob das Spiel beendet ist

function initializeBoard() {
    gameBoard.innerHTML = '';
    board = Array(9).fill(null);
    gameOver = false; // Setze das Spiel auf "nicht beendet"
    currentPlayer = 'X'; // 'X' beginnt immer

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => makeMove(i));
        gameBoard.appendChild(cell);
    }
    resultDiv.innerHTML = ''; // Reset result
}

function makeMove(index) {
    if (board[index] || gameOver) return; // Wenn die Zelle schon belegt ist oder das Spiel beendet ist, mach nichts

    board[index] = currentPlayer; // Setze das aktuelle Symbol ('X' oder 'O')
    updateBoard();

    if (checkWin()) {
        resultDiv.innerHTML = `${currentPlayer === 'X' ? 'Spieler 1 (X)' : 'Spieler 2 (O)'} hat gewonnen!`;
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== null)) {
        resultDiv.innerHTML = 'Unentschieden!';
        gameOver = true;
        return;
    }

    // Wechsel den Spieler nach jedem Zug
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    if (gameMode === 'vs-computer' && currentPlayer === 'O' && !gameOver) {
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
    if (gameOver) return;

    const emptyCells = board.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = 'O';
    updateBoard();

    if (checkWin()) {
        resultDiv.innerHTML = 'Computer hat gewonnen!';
        gameOver = true;
    } else if (board.every(cell => cell !== null)) {
        resultDiv.innerHTML = 'Unentschieden!';
        gameOver = true;
    } else {
        currentPlayer = 'X'; // Nach dem Zug des Computers wechselt der Spieler wieder zu 'X'
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
