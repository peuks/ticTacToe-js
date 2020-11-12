const elements = {
  cells: document.querySelectorAll("[data-cell]"),
  board: document.querySelector("#board"),
  winningMessage: document.querySelector("#winningMessage"), //Container,
  winningMessageContainer: document.querySelector("#winningMessageContainer"), //Container,
  resultGif: document.createElement("img"),
  btn: document.querySelector("button"),
  xClass: "x",
  yClass: "y",
  winningCombinaisons: [
    //   Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Cross
    [0, 4, 8],
    [2, 4, 6],
  ],
};

let yTurn;

function handleClick(e) {
  const currentClass = yTurn ? elements.yClass : elements.xClass;
  // placeMark
  placeMark(e.target, currentClass);
  // Check For Win
  if (checkWin(currentClass)) {
    endGame();
    return;
  }
  if (isFull()) {
    endGame(true);
    return;
  }
  // Check For Draw
  // Switch turn
  changePlayer();
  changeBoardHoverEffect();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function changePlayer() {
  yTurn = !yTurn;
}

function changeBoardHoverEffect() {
  [elements.yClass, elements.xClass].forEach((element) => {
    elements.board.classList.remove(element);
  });

  yTurn
    ? board.classList.add(elements.yClass)
    : board.classList.add(elements.xClass);
}

// some will return a true/ false after doing some operations on each element.
// each operation return true/false of elements.cells[index].classList.contains(currentClass)
// then true/false will will return true/false. Blow Mind
function checkWin(currentClass) {
  return elements.winningCombinaisons.some((combinaison) => {
    return combinaison.every((index) => {
      return elements.cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw = false) {
  if (draw) {
    elements.winningMessage.innerText = "DRAW !";
    elements.resultGif.src = "/assets/loser.gif";
    elements.winningMessageContainer.appendChild(elements.resultGif);
    document.querySelector(".loser").play();
  } else {
    elements.winningMessage.innerText = "WINNER <3";
    elements.resultGif.src = "/assets/winner.gif";
    elements.winningMessageContainer.appendChild(elements.resultGif);
    document.querySelector(".winner").play();
  }
  elements.resultGif.classList.add("flicker-in-1");
  elements.winningMessageContainer.classList.add("rotate-scale-up");

  elements.winningMessageContainer.classList.add("show");
}

function isFull() {
  return Array.from(elements.cells).every((cell) => {
    return (
      cell.classList.contains(elements.xClass) ||
      cell.classList.contains(elements.yClass)
    );
  });
}

elements.cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

elements.cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

elements.btn.addEventListener("click", () => {
  window.location.reload();
});
