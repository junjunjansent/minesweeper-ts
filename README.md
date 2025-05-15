# Simple Minesweeper 💣 Game

## Beginner User Story:

- [x] Display three buttons of difficulty for the player to select
- [x] Upon selection of the difficulty, a board would be initially displayed
  - Easy(9x9, 10 bombs (12%)) | Medium(15x15, 40 bombs (17%)) | High (30x30, 180 bombs (20%))
- [x] A player can click on the cells on the minefield board to make a move.
- [x] A message will be displayed to show how many bombs are there to be found
- [x] Every click will reveal a the cell selected and a UI will reveal whether it is clicked
- [x] The cells, when revealed, will show a number indicating the total number of bombs adjacent to the cell (diagonal inclusive)
- [x] For revealed cells, that have 0 adjacent bomb-containing cells, they will automatically reveal another 3x3 grid around it
- [x] When the player clicks a bomb-containing cell, the board will reveal all bomb-containing cells and shows a “You Lose” Message
- [x] When the player clicks a bomb-containing cell, show where did player make a mistake
- [x] When the player manages to reveal all non-bomb-containing cells, the board will reveal all cells and shows a “You Win” message
- [x] A reset button would be available for the player to re-initialise the game
- [ ] Add flag marker option & no. of flags used

## Additional User Stories:

- [ ] Refactor table into CSS grid
- [ ] Minefield can be adjusted to be played on mobile
- [x] Good UI when hovering across buttons
- [ ] Show time taken to Win/Lose & Moves Tracker
- [ ] Audio when player clicks on a bomb-containing cell

## Personal Additional User Stories:

- [ ] Navbar as a foundation for portfolio building
- [ ] Deploy if possible

## Personal Learning Pointers:

- [ ] See if can do testing
- [ ] Refactor 'difficulty' into a class to allow for further difficulty levels to be added
- [ ] Explore the use of Sets in minesweeper logic
- [ ] Explore if data can be stored on client localCache
