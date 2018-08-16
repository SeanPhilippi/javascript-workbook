'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
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

function generateHint(guess) {
  // your code here
  const guessArr = guess.split('');
  let correctLetter = 0;
  let correctPosition = 0;
  guessArr.forEach((letter, index) => {
    console.log(letter, solution.indexOf(letter), index, 'check');
    if(solution.indexOf(letter) !== -1) {
      correctLetter++;
      if(solution[index] === letter) {
        correctPosition++;
      }
    }
  })
  return `${correctLetter} are correct, ${correctPosition} are in the right place.`
  console.log(correctLetter, correctPosition, guess, 'hint');
}

const acceptableGuess = (guess) => {
    if(guess.length === 4) {
      let allLettersAreLegal = true;
      const guessArr = guess.split('');

      console.log(letters);
      guessArr.forEach((letter) => {
        if(letters.indexOf(letter) === -1){
          allLettersAreLegal = false;
        }
      })
      return allLettersAreLegal;
    }
}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here

  if (acceptableGuess(guess)) {
    if(guess === solution){
      board = [];
      return 'You guessed it!';
    } else {
      // return my hint function
      return generateHint(guess);
      board.push(guess);
      console.log(board);
      if (board.length > 9) {
        // console.log('out of turns');
        baord = [];
        return 'You Lose';
      }
    }
  } else {
    return 'Please enter valid guess';
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
