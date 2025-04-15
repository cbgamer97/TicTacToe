const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

// Build the 3x3 board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (cells[index] || checkWinner()) return;

    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const result = checkWinner();
    if (result) {
        const [winner, winPattern] = result;
        status.textContent = `${winner} wins!`;
        highlightWinner(winPattern);
    } else if (!cells.includes(null)) {
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return [cells[a], pattern]; // Return winner and winning cells
        }
    }

    return null;
}

function highlightWinner(pattern) {
    pattern.forEach(index => {
        board.children[index].classList.add('winner');
    });
}

function restartGame() {
    cells = Array(9).fill(null);
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}
