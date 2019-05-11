// white boarding
//
// chose coordinates for placing value of playerTurn and set playerTurn = to those coordinates
// create turnSwitcher function that changes playerTurn value
// run checkWin function that looks at the board to see if different win patterns have been fulfilled
// run turnSwitcher
// reset game back to choosing coordinates
// when win is detected, end game

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];
// this is so user has a board to look at for intial entry, since I moved the printBoard function out of
// getPrompt() and put it after the first mark is made.  I wanted the user to be able to see their last mark
// on the board when they win, as well as their win statement before exiting the program
let initialBoard = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let firstPrompt = true;

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function printInitialBoard() {
  console.log('   0  1  2');
  console.log('0 ' + initialBoard[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + initialBoard[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + initialBoard[2].join(' | '));
}

const turnSwitcher = () => playerTurn === 'X' ? playerTurn = 'O' : playerTurn = 'X';

const horizontalWin = () => {
  // check that index in array has a mark in it
  const win1 = board[0][0] !== ' ' && board[0][0] === board[0][1] && board[0][0] === board[0][2];
  const win2 = board[1][0] !== ' ' && board[1][0] === board[1][1] && board[1][0] === board[1][2];
  const win3 = board[2][0] !== ' ' && board[2][0] === board[2][1] && board[2][0] === board[2][2];

  if (win1 || win2 || win3) {
    return true;
  }

}

const verticalWin = () => {
  const win4 = board[0][0] !== ' ' && board[0][0] === board[1][0] && board[0][0] === board[2][0];
  const win5 = board[0][1] !== ' ' && board[0][1] === board[1][1] && board[0][1] === board[2][1];
  const win6 = board[0][2] !== ' ' && board[0][2] === board[1][2] && board[0][2] === board[2][2];

  if (win4 || win5 || win6) {
    return true;
  }
}

const diagonalWin = () => {
  const win7 = board[0][0] !== ' ' && board[0][0] === board[1][1] && board[0][0] === board[2][2];
  const win8 = board[2][0] !== ' ' && board[2][0] === board[1][1] && board[2][0] === board[0][2];

  if (win7 || win8) {
    return true;
  }
}

const checkForWin = () => {
  // check all win functions and if one is satisfied, return true to make checkForWin() truthy, this is to
  // satisfy the checkForWin() test
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    console.log(`Player ${playerTurn} wins!`);
    return true;
  }
}

const ticTacToe = (row, column) => {
  board[row][column] = playerTurn;
  printBoard();
  checkForWin();
  // continue to switch turns and give the prompt as long as there are no wins detected
  // checking all win types instead of checkForWin() to avoid printing win message twice
  if (!verticalWin() && !horizontalWin() && !diagonalWin()) {
    turnSwitcher();
    getPrompt();
  } else {
    // if win, break out of program
    return process.exit(22);
  }
}


const getPrompt = () => {
  if (firstPrompt) {
    printInitialBoard();
    // toggle this so above function only fires first time, want user to have a board to look at
    // but want the board to print before the prompt and after being marked otherwise
    firstPrompt = false;
  }
  console.log(`It's Player ${playerTurn}'s turn.`);
  // rl read line
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
    });
  });
}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
