let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = false;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const squareEls = document.querySelectorAll(".sqr");
const messageEls = document.getElementById("message");
const restartEls = document.getElementById("restartBtnEl");
document.querySelectorAll(".sqr");

for (const element of squareEls) {
  element.addEventListener("click", handleClick);
}
restartEls.addEventListener("click", function () {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  init();
});

function handleClick(event) {
  const squareIndex = event.target.id;
  if (winner === true) {
    return;
  }
  if (board[squareIndex] === "O" || board[squareIndex] === "X") {
    return;
  }
  placePiece(squareIndex);
  updateBoard();
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
}

function placePiece(index) {
  board[index] = turn;
}

function updateBoard() {
  board.forEach((str, index) => {
    squareEls[index].innerHTML = str;
  });
}

function updateMessage() {
  if (winner == false && tie == false) {
    messageEls.innerHTML = "Player " + turn + "'s turn";
  }
  if (winner == false && tie == true) {
    messageEls.innerHTML = "Tie game";
  }
  if (winner == true) {
    messageEls.innerHTML = "Congrats player " + turn + " you won!";
  }
}

function checkForTie() {
  if (winner) {
    return;
  }
  for (const i of board) {
    if (i === "") {
      return;
    }
  }
  tie = true;
}

function switchPlayerTurn() {
  if (winner) {
    return;
  }
  if (turn == "O") {
    turn = "X";
  } else {
    turn = "O";
  }
  updateMessage();
}

function checkForWinner() {
  for (const i of winningCombos) {
    const elem1 = board[i[0]];
    const elem2 = board[i[1]];
    const elem3 = board[i[2]];
    if (elem1 !== "") {
      if (elem1 === elem2) {
        if (elem1 === elem3) {
          winner = true;
          updateMessage();
          return;
        }
      }
    }
  }
}

function render() {
  updateBoard();
  updateMessage();
}

function init() {
  render();
}
init();
