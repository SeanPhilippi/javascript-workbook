'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let incorrectGuesses = 0;

// prints history of hints, each item in board array is a previous hint
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  // loops 4 times to concatenate 4 random letters from letters array into a solution string
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}
// random number for generateSolution to use
function getRandomInt(min, max) {
  // takes a min and max value (0 and 8), and multiplies the difference + the min * a random number between 
  // 0 and 1, rounded down.  this gives a random index to access random letters from the letters array
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  const solutionArray = solution.split('');
  const guessArray = guess.split('');
  // defined here so they can be returned outside the for loop
  let correctLetterLocations = 0;
  let otherCorrectLetters = 0;
  
  for (let i = 0; i < solutionArray.length; i++) {
    // for each item in solution array, check for correct letter location,
    // if found, null letter so it isn't recounted when looking for extra letters
    // not in the correct position
    if (guessArray[i] === solutionArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
    // keep track of index in solutionArray of extra correct letters and store in variable
    // use this variable to know what letter to null in solutionArray to avoid counting extra letters already counted
    let targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex > -1) {
      otherCorrectLetters++
      solutionArray[targetIndex] = null;
    }
  }
  // return colors.red(otherCorrectLetters) + ' correct letters, ' + colors.white.underline(correctLetterLocations) + ' correct locations.';
  return `${otherCorrectLetters}-${correctLetterLocations}`;
}

function mastermind(guess) {
  // getting solution from global solution variable
  if (guess == solution) {
    // logging win message for so player can see they won
    console.log('You guessed it!');
    // return win message to pass test
    return 'You guessed it!';
  } else if (incorrectGuesses === 10) {
    console.log(`You ran out of turns! The solution was ${solution}`);
  } else {
    let hint = generateHint(solution, guess);
    // let feedback = "You guessed: " + guess + "\nhint: " + hint;
    // board.push(feedback);
    board.push(hint);
    incorrectGuesses++;
    console.log('Guess again.');
  }
}


function getPrompt() {
  // node readline object's question method is called, takes a prompt string
  // and a function for the user input
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
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
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
