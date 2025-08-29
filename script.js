const gameContainer = document.querySelector(".game-container");
const movesCounter = document.getElementById("moves");
const statusText = document.getElementById("status");

const emojis = ["🍎","🍌","🍇","🍒","🍓","🍉","🍍","🥝"];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

// Shuffle array
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(emoji => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.innerText = "❓"; // back face
  card.addEventListener("click", flipCard);
  gameContainer.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.innerText = this.dataset.emoji;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesCounter.innerText = `Moves: ${moves}`;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    resetBoard();
    if (matchedPairs === emojis.length) {
      statusText.innerText = `🎉 You won in ${moves} moves!`;
    }
  } else {
    setTimeout(() => {
      firstCard.innerText = "❓";
      secondCard.innerText = "❓";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
