"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// let currentScore = 0;
// let activePlayer = 0;
// let scores = [0, 0];
// let playing = true;

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceImg.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
score0El.textContent = 0;
score1El.textContent = 0;

diceImg.classList.add("hidden");

// ROLL DICE FUNCTIONALITY

btnRoll.addEventListener("click", function () {
  if (playing) {
    diceImg.classList.remove("hidden");
    // Genarate random number
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    // console.log(randomNum);

    // Display dice roll
    diceImg.src = `dice-${randomNum}.png`;

    // Checking is it a 1 or not
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// IF USER HOLDS SCORE

// UNDERSTANDING THE PROBLEM

// - every time i clicked the hold score the previous stored value of
//   main score get deleted

btnHold.addEventListener("click", function () {
  if (playing) {
    // adding current score to the active player final score element in the array
    // console.log(scores[activePlayer]);
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// IF USER RESETS THE GAME

// Mine code 😎-
// btnNew.addEventListener("click", function () {
//   playing = true;
//   currentScore = 0;
//   scores = [0, 0];
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   diceImg.classList.add("hidden");
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--winner");
//   if (activePlayer === 1) {
//     activePlayer = 0;
//     player0El.classList.add("player--active");
//     player1El.classList.remove("player--active");
//   } else {
//     activePlayer = 0;
//     player0El.classList.add("player--active");
//     player1El.classList.remove("player--active");
//   }
// });

btnNew.addEventListener("click", init);
