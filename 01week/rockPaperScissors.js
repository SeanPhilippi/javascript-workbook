// User1 input of rock, paper, or scissors.
// User2 input of rock, paper, or scissors.
// Compare User1 input to User2 input.
// If User1 input is 'rock' and User2 input is 'scissor', User1 wins.
// If User1 input is 'rock' and User2 input is 'paper', User2 wins.
// If User1 input is 'rock' and User2 input is 'rock', it's a tie.
// If User1 input is 'paper' and User2 input is 'rock', User1 wins.
// If User1 input is 'paper' and User2 input is 'scissors', User2 wins.
// If User1 input is 'paper' and User2 input is 'paper', it's a tie.
// If User1 input is 'scissors' and User2 input is 'paper', User1 wins.
// If User1 input is 'scissors' and User2 input is 'rock', User2 wins.
// If User1 input is 'scissors' and User2 input is 'scissors', it's a tie.

// have function rockPaperScissors evaluate hand1 and hand2 entries
// code to make entries not case sensitive and to correct incorrect spelling, also trim unncessary spaces

// check to make sure both hand1 and hand2 are equal to rock, paper, or scissors

// first check if hand1 === hand2, return tie message

// if passes, check below:
// if hand1 === rock && hand2 === scissors, return hand1 wins
// else return hand2 wins

// if hand1 === paper && hand2 === rock, return hand1 wins
// else return hand2 wins

// if hand1 === scissors && hand2 === paper, return hand1 wins
// else return hand2 wins

// else return Did not enter rock, paper, or scissors!

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function rockPaperScissors(hand1, hand2) {

  // write code to remove spaces and case sensitivity
  const newhand1 = hand1.toLowerCase().trim();
  const newhand2 = hand2.toLowerCase().trim();
  // check for incorrect spellings of 'scissors' and assign hand variable to 'scissors'
  if (hand1 === 'scisors' || hand1 === 'sissors' || hand1 === 'sisors' || hand1 === 'scsissors') {
    hand1 = 'scissors';
  }
  if (hand2 === 'scisors' || hand2 === 'sissors' || hand2 === 'sisors' || hand2 === 'scsissors') {
    hand2 = 'scissors';
  } // check for correct accepted inputs: rock, paper, or scissors
  if ((hand1 === 'rock' || hand1 === 'paper' || hand1 === 'scissors') &&
      (hand2 === 'rock' || hand2 === 'paper' || hand2 === 'scissors')) {
    // check for tie
    if (hand1 === hand2) {
      return 'Tie!';
    }
    if (hand1 === 'rock') {
      if (hand2 === 'scissors') {
        return 'Hand 1 wins!';
      } else {
        return 'Hand 2 wins!';
      }
    } if (hand1 === 'scissors') {
      if (hand2 === 'paper') {
        return 'Hand 1 wins!';
      } else {
        return 'Hand 2 wins!';
      }
    } if (hand1 === 'paper') {
      if (hand2 === 'rock') {
        return 'Hand 1 wins!';
      } else {
        return 'Hand 2 wins!';
      }
    }
  } else {
    return 'Did not enter "rock", "paper", or "scissors"!';
  }
  console.log(hand1, hand2);
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {

      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests
// dlsfldks

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
