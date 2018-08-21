setBoard()
  put pieces on board
  use a for loop and loop through rows arrays for columns 1-3
  push symbol 'B' at odd numbers for row1, even numbers for row2, and odd again for row3
  push symbol 'W' at even number for row5, odd numbers for row6, and even again for row7
  viewGrid() already has loops set up to push var symbol into grid array so maybe just need a way
    to switch symbol and tell it when to push 'W' and 'B'

getPrompt()
  viewGrid()
  user inputs whichPiece # and gets options for toWhere

switchPlayer()
  switch player after each successful execution of moveChecker()

isLegal()
  can't move to blank spaces
  can't move in an occupied space
  whichPiece must be truthy (has a checker)
  can't move off board, so no coordinates containing an 8 or 9



moveChecker()
  black pieces can only move south and diagonally, so +9 or +11 for coordinates
  white pieces can only move north and diagonally, so -9 or -11 for coordinates
  detect which of the 2 possible spaces/coordinates are empty, return to user options
  prompt for user input, must be equal to one of the provided coordinates to be valid
  move piece

  if no empty coordinates, check valid coordinates (number without 8 or 9) +22 and +18 for black, -22 and -18 for white.
  if +/-9 coordinate is occupied by rival color (capturePieceLegal()?) && +/-18 is available
    allow movePiece and delete rival piece in occupied spaces
    ++ capturedBlack or capturedWhite variable

  if rival piece captured, check +/-18 and +/-22 from new coordinates for validity and emptiness && rival piece at +/-9 or +/-11
  if rival piece at +/-9 && empty space at +/-18 or rival piece at +/-11 && empty space at +/-22
    allow movePiece() and delete rival piece in occupied space
    ++ capturedBlack or capturedWhite variable

checkForWin()
  (execute when moves no longer possible?)
  check capturedBlack and capturedWhite variables
  if capturedBlack > capturedWhite
    return 'White wins!'
  if capturedWhite > capturedBlack
    return 'Black wins!'

resetGame()
  set board back to
1 - 169

9 or 11 is always the difference depending on the direction
