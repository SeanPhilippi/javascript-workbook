'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution;
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard(board) {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
	console.log('TCL: generateHint -> guess', guess)
  const solutionArray = solution.split('');
  const guessArray = guess.split('');
  let correctLocations = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      correctLocations++;
      solutionArray[i] = null;
    }
  }
  console.log('solutionArr', solutionArray);

  let correctLetters = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray.indexOf(guessArray[i]) > -1) {
      correctLetters++;
      solutionArray[i] = null;
    }
  }
  return 'You have ' + colors.red(correctLetters) + ' correct letters and ' + colors.white.underline(correctLocations) + ' are in the correct location.';
}

function mastermind(guess) {
  let hint;
  // getting solution from global solution variable
  if (guess === solution) {
    return 'You guessed it!';
  } else {
    hint = generateHint(solution, guess);
    let combString = guess + " " + hint;
    board.push(combString);
  }

}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
