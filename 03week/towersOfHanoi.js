// the plan

// chose stacks for what array to take from and what array to place in
// take last item of startStack array and place at the end of endStack array if last item of endStack array is greater than startStack item
// check for win
// print stacks
// print prompt
// reset stacks if there is a win by calling resetGame() function


'use strict';
// test comment
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const stackB = stacks.b;
const stackC = stacks.c;

// print the stacks using console.log
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// move pieces using .pop and .push
const movePiece = (moveTo, moveFrom) => {
  const grabbedBlock = moveFrom.pop();
  moveTo.push(grabbedBlock);
}

// allows small numbers to follow big numbers, and disallows big numbers to follow small number
const isLegal = (startStack, endStack) => {
  console.log('endStack value: ' + stacks[endStack][stacks[endStack].length - 1])
  console.log('startStack value: ' + stacks[startStack][stacks[startStack].length - 1])
  if (stacks[endStack][stacks[endStack].length - 1] > stacks[startStack][stacks[startStack].length - 1] || stacks[endStack].length === 0) {
    return true;
  } else {
    console.log("bigger numbers can't follow smaller numbers!");
    return false;
  }
}

// reset stacks after a win
const resetGame = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }
}

// check for a win by checking length of arrays B and C
const checkForWin = () => {
  if (stackB.length !== 4 && stackC.length !== 4) {
    console.log('checkForWin: false');
    return false;
  } else {
    console.log('You win!');
    return true;
  }
}

// call movePiece function so prompt inputs result in numbers being moved
const towersOfHanoi = (startStack, endStack) => {
  console.log('stacksB:' + stacks.b)
  const moveFrom = stacks[startStack];
  const moveTo = stacks[endStack];
  if(isLegal(startStack, endStack)) {
    movePiece(moveTo, moveFrom);
    checkForWin(stacks.b, stacks.c);
    if (checkForWin()) {
      resetGame();
    }
  }
}

// print stacks and give prompts that allow user to input a start stack and end stack
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
