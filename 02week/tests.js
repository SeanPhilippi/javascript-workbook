// Write new tests for Rock Paper Scissors in the javascript-workbook 02week/test.js:
// Test for all possible scenaries in which "Hand one wins!".
// Test for all possible scenaries in which "Hand two wins!".
// Test to make sure user must input a valid entry (e.g. 'rock', 'paper', or 'scissors')
// Think of more tests you could write and try writing them.

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('all instances where hand 1 wins', () => {
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand 1 wins!");
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand 1 wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand 1 wins!");
    });
    it('all instances where hand 2 wins', () => {
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand 2 wins!");
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand 2 wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand 2 wins!");
    });
    it('should detect that input is valid', () => {
      assert.equal(rockPaperScissors('rock', 'blanket'), 'Did not enter "rock", "paper", or "scissors"!');
      assert.equal(rockPaperScissors('pebble', 'chair'), 'Did not enter "rock", "paper", or "scissors"!');
      assert.equal(rockPaperScissors('42', 'efseg'), 'Did not enter "rock", "paper", or "scissors"!');
    });
    it('reject numbers and strings containing numbers', () => {
      assert.equal(rockPaperScissors('red7', '35'), 'Did not enter "rock", "paper", or "scissors"!');
      assert.equal(rockPaperScissors('paper1', '2blue'), 'Did not enter "rock", "paper", or "scissors"!');
      assert.equal(rockPaperScissors('ratt4le', 'r3x46'), 'Did not enter "rock", "paper", or "scissors"!');
    });
    it('convert mispellings of scissors to correct spelling', () => {
      assert.equal(rockPaperScissors('rock', 'scisors'), "Hand 2 wins!");
      assert.equal(rockPaperScissors('scissors', 'sissors'), "Tie!");
      assert.equal(rockPaperScissors('rock', 'sisors'), "Hand 1 wins!");
    });
  });
} else {

  getPrompt();

}
