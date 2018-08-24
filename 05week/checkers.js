'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



class Checker {
  constructor(color) {
    if (color === 'white') {
      this.symbol = 'W';
      this.name = 'White';
    } else {
      this.symbol = 'B';
      this.name = 'Black';
    }
  }
}

const whiteChecker = new Checker('white');
const blackChecker = new Checker('black');

let playerTurn = blackChecker;

let whtCaptureCount = 0;
let blkCaptureCount = 0;

class Board {
  constructor() {
    this.checkers = [];
    // console.log('checkers: ', this.checkers)
    this.grid = [];
    // console.log('grid: ', this.grid)
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the checker at [row, column] coordinates
          // in grid array onto that position in the rowofCheckers array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
  setBoard() {
    const whitePosition = [
      // 12 arrays, indexed 0-11
      // within each array, (row) and (column) indexed at 0 and 1
      [0, 1],
      [0, 3],
      [0, 5],
      [0, 7],
      [1, 0],
      [1, 2],
      [1, 4],
      [1, 6],
      [2, 1],
      [2, 3],
      [2, 5],
      [2, 7]
    ]
    // looping through whitePosition to grab row and column coordinates
    // and assign them to whiteRow and whiteColumn variables
    for (let i = 0; i < 12; i++) {
      let whiteRow = whitePosition[i][0];
      let whiteColumn = whitePosition[i][1];
      // new Checker class created with 'white' put in for color value
      // this is to tell Checker function what symbol to push to board

      this.checkers.push(whiteChecker);
      this.grid[whiteRow][whiteColumn] = whiteChecker;

    }
    const blackPosition = [
      [5, 0],
      [5, 2],
      [5, 4],
      [5, 6],
      [6, 1],
      [6, 3],
      [6, 5],
      [6, 7],
      [7, 0],
      [7, 2],
      [7, 4],
      [7, 6]
    ]
    for (let i = 0; i < 12; i++) {
      let blackRow = blackPosition[i][0];
      let blackColumn = blackPosition[i][1];

      // do I even need this or the checkers array?
      this.checkers.push(blackChecker);
      this.grid[blackRow][blackColumn] = blackChecker;
    }
  }
}

////////////////////////////////////////////////////////////////////////////

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.setBoard();
  }

  moveChecker (whichPiece, toWhere) {
    // .map calls Number() on each element in the array created by .split()
    const fromCoords = whichPiece.split('').map(Number);
    const toCoords = toWhere.split('').map(Number);
    const moveDir = moveDirection();

    // first legal filter, must have legal coordinates
    if(fromCoords[0] <= 7 && fromCoords[1] <= 7 && toCoords[0] <= 7 && toCoords[1] <= 7) {
      // toWhere must be empty and whichPiece must be true(not empty)
      if (this.board.grid[toCoords[0]][toCoords[1]] === null &&
      this.board.grid[fromCoords[0]][fromCoords[1]]) {
        movePiece();
      } else {
        console.log('Not a legal move!');
      }
    } else {
      console.log('Please enter valid coordinates as a 2-digit number!');
    }

    function moveDirection() {
      switch (Number(toWhere) - Number(whichPiece)) {
        case 9:
        case 18: return 'down-left';
        case 11:
        case 22: return 'down-right';
        case -9:
        case -18: return 'up-right';
        case -11:
        case -22: return 'up-left';
      }
    }

    console.log(moveDir);

    function whiteRules() {
      if (playerTurn === whiteChecker) {
        // if toWhere is whichPiece +9 or +11
        if (Number(toWhere) === Number(whichPiece) + 9 || Number(toWhere) === Number(whichPiece) + 11) {
          return true;
        } else if (Number(toWhere) === Number(whichPiece) + 18) {
        // something here
        } else {
          console.log('White: Not a legal move');
        }
      }
    }

    function blackRules() {
      if (playerTurn === blackChecker) {
        // if toWhere is whichPiece -9 or - 11
        if (Number(toWhere) === Number(whichPiece) - 9 || Number(toWhere) === Number(whichPiece) - 11) {
          return true;
        } else {
          console.log('Black: Not a legal move');
        }
      }
    }

    // function whiteJumpRules() {
    //   if (playerTurn === whiteChecker) {
    //     // if toWhere is whichPiece +9 or +11
    //     if ((Number(toWhere) === Number(whichPiece) + 18)) {
    //       // return true;
    //       console.log('success')
    //     } else {
    //       console.log('Not a legal move');
    //     }
    //   }
    // }
    //
    // function blackJumpRules() {
    //
    // }
    //
    function movePiece() {
      // clear whichPiece space
      if (whiteRules() || blackRules()) {
        game.board.grid[fromCoords[0]][fromCoords[1]] = null;
        // assign correct piece to toWhere space
        game.board.grid[toCoords[0]][toCoords[1]] = playerTurn;
        switchPlayer();
      }
    }

    function switchPlayer() {
      if (playerTurn === whiteChecker) {
        playerTurn = blackChecker;
      } else {
        playerTurn = whiteChecker;
      }
      console.log(playerTurn.name + "'s turn");
    }
  }
}


const getPrompt = () => {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      // 5 is x coordinate, 0 is y coordinate for '50'
      // moving black checker north one space
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      // moving white checker south one space
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      // moving another black checker north one space
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      // space where rival checker is becomes falsy (piece is deleted)
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
