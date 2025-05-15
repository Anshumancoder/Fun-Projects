const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerturn");
const startScreen = document.querySelector(".startscreen");
const startButton = document.getElementById("start");
const message = document.getElementById("message");

const popup = document.getElementById("gamePopup");
const popupMessage = document.getElementById("popupMessage");
const restartBtn = document.getElementById("restartBtn");

let initialMatrix;
let currentPlayer;
let gameActive = true;

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const verifyArray = (array) => {
  let count = 0;
  for (let val of array) {
    if (val === currentPlayer) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
};

const checkRow = (row) => verifyArray(initialMatrix[row]);

const checkColumn = (col) => {
  let colArray = initialMatrix.map(row => row[col]);
  return verifyArray(colArray);
};

const getRightDiagonal = (row, col) => {
  let diag = [];
  while (row > 0 && col < 6) {
    row--;
    col++;
  }
  while (row < 6 && col >= 0) {
    diag.push(initialMatrix[row][col]);
    row++;
    col--;
  }
  return diag;
};

const getLeftDiagonal = (row, col) => {
  let diag = [];
  while (row > 0 && col > 0) {
    row--;
    col--;
  }
  while (row < 6 && col < 7) {
    diag.push(initialMatrix[row][col]);
    row++;
    col++;
  }
  return diag;
};

const checkDiagonal = (row, col) => {
  return verifyArray(getRightDiagonal(row, col)) || verifyArray(getLeftDiagonal(row, col));
};

const winCheck = (row, col) => {
  return checkRow(row) || checkColumn(col) || checkDiagonal(row, col);
};

const gameOverCheck = () => {
  const full = initialMatrix.every(row => row.every(cell => cell !== 0));
  if (full) {
    showPopup("It's a draw!");
    return true;
  }
  return false;
};

const showPopup = (text) => {
  popupMessage.innerText = text;
  popup.classList.remove("hide");
  gameActive = false;
};

const setPiece = (row, col) => {
  if (initialMatrix[row][col] !== 0) {
    setPiece(row - 1, col);
    return;
  }

  const rows = document.querySelectorAll(".grid-row");
  const boxes = rows[row].querySelectorAll(".grid-box");
  boxes[col].classList.add("filled", `player${currentPlayer}`);
  initialMatrix[row][col] = currentPlayer;

  if (winCheck(row, col)) {
    showPopup(`Player ${currentPlayer} wins!`);
    return;
  }

  if (!gameOverCheck()) {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
  }
};

const fillBox = (e) => {
  if (!gameActive) return;

  const col = parseInt(e.target.getAttribute("data-value"));
  setPiece(5, col);
};

const matrixCreator = () => {
  initialMatrix = Array.from({ length: 6 }, () => Array(7).fill(0));
  container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("grid-row");
    for (let j = 0; j < 7; j++) {
      const box = document.createElement("div");
      box.classList.add("grid-box");
      box.setAttribute("data-value", j);
      box.addEventListener("click", fillBox);
      rowDiv.appendChild(box);
    }
    container.appendChild(rowDiv);
  }
};

const startGame = () => {
  gameActive = true;
  popup.classList.add("hide");
  currentPlayer = generateRandomNumber(1, 3);
  matrixCreator();
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
};

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  startGame();
});

restartBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  startGame();
});

window.onload = () => {
  startGame();
};
