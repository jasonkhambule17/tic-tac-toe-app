const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function createBoard() {
 return Array(9).fill('');
}

function togglePlayer(current) {
 return current === 'O' ? 'X' : 'O';
}

function isBoardFull(board) {
 return board.every(cell => cell !== '');
}

function checkWinner(board, player) {
 for (const combo of WINNING_COMBOS){
  if (combo.every(i => board[i] === player)) return combo;
 }
 return null;
}

if (typeof module !== 'undefined') {
  module.exports = { checkWinner, isBoardFull, togglePlayer, createBoard };
}

if (typeof document !== 'undefined') {

  let board = createBoard();
  let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  let gameOver = false;
  let scoreX = 0;
  let scoreO = 0;

  const cells = document.querySelectorAll('.board__cell');
  const resetBtn = document.getElementById('resetBtn');
  const anotherGameBtn = document.getElementById('anotherGameBtn');
  const rematchBtn = document.getElementById('rematchBtn');
  const boardBanner = document.getElementById('boardBanner');
  const statusMessage = document.getElementById('boardMessage');
  const currentPlayerEl = document.getElementById('currentPlayer');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);
  anotherGameBtn.addEventListener('click', anotherGame);
  rematchBtn.addEventListener('click', rematch);
  currentPlayerEl.setAttribute('data-player', currentPlayer);

  function handleCellClick(e) {
  const index = Number(e.currentTarget.dataset.index);

  if (gameOver || board[index] !== '') return;

  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.setAttribute('data-mark', currentPlayer);
  e.currentTarget.disabled = true;

  const winCombo = checkWinner(board, currentPlayer);
  if (winCombo) {
    statusMessage.textContent = `Team ${currentPlayer} is the winner!`;
    currentPlayerEl.textContent = ``;
    boardBanner.hidden = false;
    gameOver = true;
    cells.forEach(c => (c.disabled = true));
    return;
  }
  
  if (isBoardFull(board)) {
    statusMessage.textContent = "No Winner - It's a tie!";
    currentPlayerEl.textContent = ``;
    boardBanner.hidden = false;
    gameOver = true;
    return;
  }
  currentPlayer = togglePlayer(currentPlayer);
  currentPlayerEl.textContent = `It's Team ${currentPlayer}'s Turn`;
  }

  function resetGame() {
  scoreX = 0;
  scoreO = 0;
  scoreXEl.textContent = 0;
  scoreOEl.textContent = 0;
  board = createBoard();
  currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.removeAttribute('data-mark');
  });

  boardBanner.hidden = true;
  currentPlayerEl.setAttribute('data-player', currentPlayer);
  currentPlayerEl.textContent = `It is Team ${currentPlayer}'s Turn`;
  }
  function anotherGame() {
    if (currentPlayer === 'X') {
      scoreX++;
      scoreXEl.textContent = scoreX;
    } else {
      scoreO++;
      scoreOEl.textContent = scoreO;
    }

    board = createBoard();
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.removeAttribute('data-mark');
  });

  boardBanner.hidden = true;
  currentPlayerEl.setAttribute('data-player', currentPlayer);
  currentPlayerEl.textContent = `It is Team ${currentPlayer}'s Turn`;
  }

  function rematch() {
    board = createBoard();
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameOver = false;

    cells.forEach(cell => {
      cell.textContent = '';
      cell.disabled = false;
      cell.removeAttribute('data-mark');
      cell.classList.remove('winner');
    });

    boardBanner.hidden = true;
    currentPlayerEl.setAttribute('data-player', currentPlayer);
    currentPlayerEl.textContent = `It is Team ${currentPlayer}'s Turn`;
  }
}