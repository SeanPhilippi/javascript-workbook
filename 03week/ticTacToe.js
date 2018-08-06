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

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const turnSwitcher = () => {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  } else {
    playerTurn = 'X';
  }
}

const horizontalWin = () => {
  const horizontalLine = {
    win1: board[0][0] === board[0][1] && board[0][0] === board[0][2],
    win2: board[1][0] === board[1][1] && board[1][0] === board[1][2],
    win3: board[2][0] === board[2][1] && board[2][0] === board[2][2],
  }
  if (horizontalLine.win1 || horizontalLine.win2 || horizontalLine.win3) {
    return 'Player '+ playerTurn ' wins!';
  }

}

const verticalWin = () => {
  // Your code here
}

const diagonalWin = () => {
  // Your code here
}

const checkForWin = () => {
  horizontalWin();
}

const ticTacToe = (row, column) => {
  board[row][column] = playerTurn;
  checkForWin();
  turnSwitcher();
  console.log(board[0].slice(0,2))
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
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
      assert.equal(verticalWin(), true);2
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
