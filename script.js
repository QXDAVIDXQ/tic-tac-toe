const gameBoard = document.getElementById('game-board');
const resultDiv = document.getElementById('result');
const twoPlayerButton = document.getElementById('two-player');
const vsComputerButton = document.getElementById('vs-computer');

let gameMode = ''; // 'two-player' oder 'vs-computer'
let currentPlayer = 'X'; // 'X' startet immer
let board = Array(9).fill(null); // Tic-Tac-Toe Board (9 Felder)
let gameOver = false; // Flag, ob das Spiel beendet ist

// Funktion zur Initialisierung des Spielfelds
function initializeBoard() {
    gameBoard.innerHTML = ''; // Lösche das alte Spielfeld
    board = Array(9).fill(null); // Leeres Spielfeld erstellen
    gameOver = false; // Das Spiel ist noch nicht beendet
    currentPlayer = 'X'; // Spieler 1 (X) beginnt immer

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell'); // Optional: Füge eine CSS-Klasse hinzu
        cell.addEventListener('click', () => makeMove(i)); // Event-Listener für den Klick auf das Feld
        gameBoard.appendChild(cell);
    }
    resultDiv.innerHTML = ''; // Reset das Ergebnisfeld
}

// Funktion, um einen Zug zu machen
function makeMove(index) {
    if (board[index] || gameOver) return; // Wenn das Feld schon belegt oder das Spiel vorbei ist, nichts tun

    board[index] = currentPlayer; // Setze das Symbol des aktuellen Spielers ('X' oder 'O')
    updateBoard(); // Aktualisiere das Spielfeld

    // Überprüfe, ob jemand gewonnen hat
    if (checkWin()) {
        resultDiv.innerHTML = `${currentPlayer === 'X' ? 'Spieler 1 (X)' : 'Spieler 2 (O)'} hat gewonnen!`;
        gameOver = true; // Spiel ist zu Ende
        return;
    }

    // Überprüfe, ob es ein Unentschieden gibt
    if (board.every(cell => cell !== null)) {
        resultDiv.innerHTML = 'Unentschieden!';
        gameOver = true; // Spiel ist zu Ende
        return;
    }

    // Wechsel den Spieler
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Wenn es der Computerzug ist, dann lass den Computer nach einer kurzen Verzögerung spielen
    if (gameMode === 'vs-computer' && currentPlayer === 'O' && !gameOver) {
        setTimeout(computerMove, 500); // Computerzug nach kurzer Verzögerung
    }
}

// Funktion, um das Spielfeld zu aktualisieren
function updateBoard() {
    const cells = gameBoard.children;
    board.forEach((value, index) => {
        cells[index].innerText = value; // Setze das Symbol in die Zelle
    });
}

// Funktion, um zu prüfen, ob ein Spieler gewonnen hat
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

// Funktion für den Zug des Computers (einfacher zufälliger Zug)
function computerMove() {
    if (gameOver) return; // Wenn das Spiel schon vorbei ist, beende die Funktion

    const emptyCells = board.map((value, index) => value === null ? index : -1).filter(index => index !== -1); // Finde leere Zellen
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Zufälligen Zug auswählen
    board[randomMove] = 'O'; // Computer setzt 'O'
    updateBoard(); // Aktualisiere das Spielfeld

    // Überprüfe, ob der Computer gewonnen hat
    if (checkWin()) {
        resultDiv.innerHTML = 'Computer hat gewonnen!';
        gameOver = true; // Spiel zu Ende
    } else if (board.every(cell => cell !== null)) { // Überprüfe auf Unentschieden
        resultDiv.innerHTML = 'Unentschieden!';
        gameOver = true; // Spiel zu Ende
    } else {
        currentPlayer = 'X'; // Nach dem Computerzug wechselt der Spieler zu 'X'
    }
}

// Setze den Spielmodus auf "Zwei Spieler"
twoPlayerButton.addEventListener('click', () => {
    gameMode = 'two-player';
    initializeBoard(); // Initialisiere das Spielfeld
});

// Setze den Spielmodus auf "Gegen Computer"
vsComputerButton.addEventListener('click', () => {
    gameMode = 'vs-computer';
    initializeBoard(); // Initialisiere das Spielfeld
});
