export function sudokuSolver(board) {
    if (checkFullBoard(board)) return true;
  
    //recursive backtracking algorithm
    //places a val in a cell and tries to solve from there
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (board[i][j] === 0) {
          for (let val = 1; val <= 9; val++)
            if (isValidPlacement(board, val, i, j)) {
              board[i][j] = val;
              if (sudokuSolver(board)) return true;
            }
          board[i][j] = 0;
          return false;
        }
  }
  
  //this is the same as sudokuSolver, just it tries to solve it by placing the values in descending order
  //the purpose of this function is part of my algorithm for checking uniqueness
  function sudokuSolverBackwards(board) {
    if (checkFullBoard(board)) return true;
  
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (board[i][j] === 0) {
          for (let val = 9; val >= 1; val--)
            if (isValidPlacement(board, val, i, j)) {
              board[i][j] = val;
              if (sudokuSolverBackwards(board)) return true;
            }
          board[i][j] = 0;
          return false;
        }
  }
  
  //sees if every spot on the sudoku board is taken (0 represents empty spot)
  function checkFullBoard(board) {
    for (let row of board) for (let entry of row) if (entry === 0) return false;
    return true;
  }
  
  //checks if placing the value at the spot in the board causes a conflict
  function isValidPlacement(board, val, row, col) {
    return (
      rowChecker(board, val, row) &&
      colChecker(board, val, col) &&
      boxChecker(board, val, row, col)
    );
  }
  
  function rowChecker(board, val, row) {
    for (let j = 0; j < 9; j++) if (board[row][j] === val) return false;
  
    return true;
  }
  
  function colChecker(board, val, col) {
    for (let i = 0; i < 9; i++) if (board[i][col] === val) return false;
  
    return true;
  }
  
  function boxChecker(board, val, row, col) {
    //find the top left cell of the 3x3 box it's in
    let initialRow = 3 * Math.floor(row / 3);
    let initialCol = 3 * Math.floor(col / 3);
  
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[initialRow + i][initialCol + j] === val) return false;
  
    return true;
  }
  
  //function that initializes the empty board and availableOptions 3D array and calls generateBoard()
  export function createRandomBoard() {
    let board = [];
    let availableOptions = []; //each cell in the 9x9 has 9 possible options
    for (let i = 0; i < 9; i++) {
      board.push([]);
      availableOptions.push([]);
      for (let j = 0; j < 9; j++) {
        availableOptions[i][j] = [];
        board[i].push(0);
        for (let k = 1; k <= 9; k++) availableOptions[i][j].push(k);
      }
    }
    generateBoard(board, availableOptions);
    return board;
  }
  
  //algorithm:
  //start with empty board, just like solving it except choose a random value
  function generateBoard(board, availableOptions) {
    //availableOptions is 3D array: each cell in 9x9 2D array contains a list of available values 1-9 for the cell
    if (checkFullBoard(board)) return true;
  
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          while (availableOptions[i][j].length > 0) {
            //each cell in the 9x9 has 9 possible options
            //choose a random one since we are generating a random board
            let randIdx = Math.floor(
              Math.random() * availableOptions[i][j].length
            );
            let val = availableOptions[i][j][randIdx];
            if (isValidPlacement(board, val, i, j)) {
              board[i][j] = val;
              if (generateBoard(board, availableOptions)) return true;
            }
            //if didn't work, remove that option and try another
            availableOptions[i][j] = availableOptions[i][j].filter(
              (entry) => entry !== val
            );
          }
          //if all options failed, reset cell, reset options and backtrack
          board[i][j] = 0;
          availableOptions[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          return false;
        }
      }
  }
  //algorithm:
  //random order of 0 through 80 for the 81 cells
  //for each cell number 0 through 80, convert to the row and col of the cell
  //remove the value from that cell and check that there is a unique solution still
  //stop when reached the difficulty provided
  export function trimBoard(board, difficulty) {
    //difficulty is an integer number of empty cells
    let cellIdxs = [];
    for (let idx = 0; idx < 81; idx++) cellIdxs.push(idx);
  
    cellIdxs.sort((a, b) => 0.5 - Math.random());
    let count = 0;
    for (let idx of cellIdxs) {
      //convert number 0 to 80 into row and col
      let row = Math.floor(idx / 9);
      let col = idx % 9;
  
      let val = board[row][col];
      board[row][col] = 0;
      if (!uniqueness(board)) {
        board[row][col] = val;
      } else count++;
      if (count === 81 - difficulty) break;
    }
  }
  /*
  checks if a sudoku board has a unique solution
  this is my original algorithm idea
  I made two copies of the board and solve one with sudokuSolver and the other one with sudokuSolverBackwards
  the difference is sudoku solver brute forces trying 1 to 9 in increasing order whereas backwards tries 9 to 1 in descending order
  the two solutions will be the same if and only if there is only one solution
  Proof: If two distinct solutions exist, consider a cell that they differ in. One number must be smaller than the other.
  sudoku solver will find the solution with the smaller number first and use that one whereas backwards will find the solution with the larger
  */
  function uniqueness(board) {
    let board1 = [[], [], [], [], [], [], [], [], []];
    let board2 = [[], [], [], [], [], [], [], [], []];
    for (let row = 0; row < 9; row++)
      for (let col = 0; col < 9; col++) {
        let val = board[row][col];
        board1[row][col] = val;
        board2[row][col] = val;
      }
  
    sudokuSolver(board1);
    sudokuSolverBackwards(board2);
  
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) if (board1[i][j] !== board2[i][j]) return false;
  
    return true;
  }
  