setBoard()
  put pieces on board

getPrompt()
  viewGrid()
  user inputs whichPiece # and gets options for toWhere

switchPlayer()
  switch player after each successful execution of moveChecker()

isValid()
  can't move to white spaces, throw something like a -1 in those spots
  can't move in an occupied space
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
