'use strict';

let choosenNumber = Math.trunc(Math.random() * 20) + 1;
console.log(choosenNumber);
const lukyNumber = document.querySelector('.number');

let confettiSettings = { target: 'confetti-canvas' };
let confetti = new ConfettiGenerator(confettiSettings);

let Score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number';
  } else if (guess === choosenNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number';

    confetti.render();
    lukyNumber.textContent = choosenNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (Score > highscore) {
      highscore = Score;
      document.querySelector('.highscore').textContent = highscore;
    }

    const audio = new Audio('./children-yay-sound-effectmp3-320k_VB7Ch4TH.mp3');
    audio.play();
  } else if (guess < choosenNumber) {
    if (Score > 1) {
      document.querySelector('.message').textContent = '📉 too low!';
      Score--;
      document.querySelector('.score').textContent = Score;
    } else {
      document.querySelector('.message').textContent =
        '💥 you have lost the game';
      document.querySelector('.score').textContent = 0;
      const audioLoose = new Audio(
        './Arcade game over sound effect_(MP3_320K).mp3'
      );
      audioLoose.play();
    }
  } else if (guess > choosenNumber) {
    if (Score > 1) {
      document.querySelector('.message').textContent = '📈 too hight!';
      Score--;
      document.querySelector('.score').textContent = Score;
    } else {
      document.querySelector('.message').textContent =
        '💥 you have lost the game';
      document.querySelector('.score').textContent = 0;
      const audiofail = new Audio(
        './Arcade game over sound effect_(MP3_320K).mp3'
      );
      audiofail.play();
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  Score = 20;
  choosenNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(choosenNumber);

  document.querySelector('.score').textContent = Score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';

  // remove and re-add canvas element
  const canvas = document.getElementById('confetti-canvas');
  const parent = canvas.parentNode;
  parent.removeChild(canvas);
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'confetti-canvas';
  parent.appendChild(newCanvas);

  // re-initialize confetti
  confetti = new ConfettiGenerator({ target: 'confetti-canvas' });
});
