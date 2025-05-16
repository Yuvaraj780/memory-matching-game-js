let board = document.querySelector(".board");
let tiles = [];
let flippedTiles = [];
let matchedCount = 0;

function createTiles() {
  let numbers = [...Array(8).keys()].flatMap((n) => [n, n]);
  shuffle(numbers);

  tiles = numbers.map((number, index) => {
   let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.number = number;
    tile.dataset.index = index;
    tile.innerText = "";
    tile.addEventListener("click", () => {
      flipTiles(tile);
    });
    board.appendChild(tile);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function flipTiles(tile) {
  if (tile.classList.contains("revealed") || flippedTiles.length === 2) return;

  tile.classList.add("revealed");
  tile.innerText = tile.dataset.number;
  flippedTiles.push(tile);

  if (flippedTiles.length === 2) {
    let [one, second] = flippedTiles;
    if (one.dataset.number === second.dataset.number) {
      matchedCount++;
      flippedTiles = [];
      if (matchedCount === 8) {
        setTimeout(() => {
          alert("You Won!");
        }, 300);
      }
    } else {
      setTimeout(() => {
        one.classList.remove("revealed");
        second.classList.remove("revealed");
        one.innerText = "";
        second.innerText = "";
        flippedTiles = [];
      }, 1000);
    }
  }
}

document.querySelector(".restart").addEventListener("click", () => {
  board.innerHTML = "";
  tiles = [];
  flippedTiles = [];
  createTiles();
});

createTiles();
