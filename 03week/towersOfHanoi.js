// the plan

// chose stacks for what array to take from and what array to place in
// take last item of startStack array and place at the end of endStack array if last item of endStack array is greater than startStack item
// check for win
// print stacks
// reset game, allow for inputs again
// if win detected, end game


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

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {

  let moveFrom = stacks[startStack];
  let moveTo = stacks[endStack];
  console.log('moveTo: '+ moveTo);
  console.log('moveFrom: '+ moveFrom);
  if (moveTo[moveTo.length - 1] > moveFrom[moveFrom.length - 1] || moveTo.length === 0) {
    let grabbedBlock = moveFrom.pop();
    // console.log('grabbedBlock: '+ grabbedBlock);
    moveTo.push(grabbedBlock);
    checkForWin();
    if(checkForWin()) {
      console.log('You win!');
    }
  } else {
    console.log("bigger numbers can't follow smaller numbers!");
  }



}

function isLegal() {
  // Your code here

}


console.log(stacks.c);


function checkForWin() {
  const winArr = [4, 3, 2, 1];
  let stackC = stacks.c;
  for(let i = winArr.length; i--;) {
    if(winArr[i] !== stackC[i])
      return false;
  }
  return true;
}

function towersOfHanoi(startStack, endStack) {
  movePiece(startStack, endStack);

}

function getPrompt() {
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
