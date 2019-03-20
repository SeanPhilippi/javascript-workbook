'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  // loops 4 times to concatenate 4 random letters from letters array 
  // into a solution string with a length of 4
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}
// random number for generateSolution to use
function getRandomInt(min, max) {
  // takes a min and max value (0 and 8), and multiples the difference + the min * a random number
  // between 0 and 1, rounded down.  this gives a random index to access a random letters from letters
  // array
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  const solutionArray = solution.split('');
  const guessArray = guess.split('');
  let correctLocations = 0;
  let correctLetters = 0;

  for (let i = 0; i < solutionArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      correctLocations++;
      solutionArray[i] = null;
      console.log('solArr after location loop', solutionArray);
    }

    let targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex > -1) {
      correctLetters++
      solutionArray[targetIndex] = null;
      console.log('solArr after letters loop', solutionArray)
    }
  }
  // return colors.red(correctLetters) + ' correct letters, ' + colors.white.underline(correctLocations) + ' correct locations.';
  return `${correctLetters}-${correctLocations}`;
}

function mastermind(guess) {
  // getting solution from global solution variable
  if (guess == solution) {
    console.log('You guessed it!')
    return 'You guessed it!';
  } else {
    let hint = generateHint(solution, guess);
    // let feedback = "You guessed: " + guess + "\nhint: " + hint;
    // board.push(feedback);
    board.push(hint);
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

  // generateSolution();
  getPrompt();
}
