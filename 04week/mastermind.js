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
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// set to 11, so when at 0, prompting will stop
let turns = 11;

// prints history of hints, each item in board array is a previous hint
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
  if (turns > 1) {
    console.log(`${turns - 1} turns left`.magenta.bgBlack + '\nGuess again...'.yellow.italic)
  } else {
    console.log('Last turn!!!'.red);
  }
}

// resets game/global vars
function exitGame() {
  setTimeout((function() {  
    console.log('\n');
    return process.exit();
  }), 3000);
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

function generateHint(guess) {
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
  }
  for (let i = 0; i < solutionArray.length; i++) {
    // keep track of index in solutionArray of extra correct letters and store in variable
    // use this variable to know what letter to null in solutionArray to avoid counting extra letters already counted
    const targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex > -1) {
      otherCorrectLetters++
      solutionArray[targetIndex] = null;
    }
  }

  return `${otherCorrectLetters}`.red + '-' + `${correctLetterLocations}`.white.underline;
}

function mastermind(guess) {
  // getting solution from global solution variable
  if (guess === solution) {
    // logging win message so player can see they won
    console.log('==========================='.green);
    console.log('Congrats!! You guessed it!!'.green);
    console.log('==========================='.green);
    exitGame();
    // return win message to pass test
    return 'You guessed it!';
  } else {
    let hint = generateHint(guess);
    board.push(hint);
    turns--;
  }
}


function getPrompt() {
  // node readline createInterface object's question method is called, takes 
  // a prompt string and a function that takes the user standard input
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    if (turns !== 0) {
      getPrompt();
    } else {
      console.log('You ran out of turns! The solution was '.red + `${solution}`.cyan.bgBlack);
      exitGame();
    }
  });
}

// Tests
// * to run tests, npm test 04week/mastermind.js

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      // checking to see that a hint was pushed into board array
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      // assert.equal(generateHint('abdc'), '2-2');
      assert.equal(generateHint('abdc'), '2'.red+'-'+'2'.white.underline);
    });
    it('should generate hints if solution has duplicates', () => {
      // assert.equal(generateHint('aabb'), '1-1');
      assert.equal(generateHint('aabb'), '1'.red+'-'+'1'.white.underline);
    });

  });

} else {

  generateSolution();
  getPrompt();
}
