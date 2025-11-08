function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}
function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Solve Sudoku puzzle using backtracking algorithm
 * Returns true if solution is found, false otherwise
 */
function solveSudoku(board) {
  const emptyCell = findEmptyCell(board);
  
  // No empty cells means puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      // Place the number
      board[row][col] = num;

      // Recursively try to solve the rest
      if (solveSudoku(board)) {
        return true;
      }

      // Backtrack if solution not found
      board[row][col] = 0;
    }
  }

  // No valid number found, trigger backtracking
  return false;
}

/**
 * Validate that the board is a valid Sudoku configuration
 */
function isValidSudoku(board) {
  // Check if board is 9x9
  if (!Array.isArray(board) || board.length !== 9) {
    return false;
  }

  for (let row of board) {
    if (!Array.isArray(row) || row.length !== 9) {
      return false;
    }
    for (let cell of row) {
      if (typeof cell !== 'number' || cell < 0 || cell > 9) {
        return false;
      }
    }
  }

  // Check for conflicts in initial configuration
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) {
        const num = board[row][col];
        board[row][col] = 0; // Temporarily remove to check validity
        
        if (!isValid(board, row, col, num)) {
          board[row][col] = num; // Restore
          return false;
        }
        
        board[row][col] = num; // Restore
      }
    }
  }

  return true;
}

/**
 * Main function to solve a Sudoku puzzle
 * Returns an object with success status and solution/error message
 */
export function solve(board) {
  // Create a copy to avoid modifying the original
  const boardCopy = board.map(row => [...row]);

  // Validate input
  if (!isValidSudoku(boardCopy)) {
    return {
      success: false,
      message: 'Invalid Sudoku puzzle configuration'
    };
  }

  // Attempt to solve
  const solved = solveSudoku(boardCopy);

  if (solved) {
    return {
      success: true,
      solution: boardCopy
    };
  } else {
    return {
      success: false,
      message: 'No solution exists for this puzzle'
    };
  }
}
