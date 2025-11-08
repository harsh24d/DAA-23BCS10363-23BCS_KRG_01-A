import { useState, useRef, useEffect } from 'react';

export default function SudokuGrid({ board, onBoardChange, initialBoard }) {
  const inputRefs = useRef([]);

  const handleCellChange = (row, col, value) => {
    // Only allow numbers 1-9 or empty
    if (value === '' || (value >= '1' && value <= '9')) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = value === '' ? 0 : parseInt(value);
      onBoardChange(newBoard);
    }
  };

  const handleKeyDown = (e, row, col) => {
    const { key } = e;
    let newRow = row;
    let newCol = col;

    // Arrow key navigation
    if (key === 'ArrowUp' && row > 0) newRow--;
    else if (key === 'ArrowDown' && row < 8) newRow++;
    else if (key === 'ArrowLeft' && col > 0) newCol--;
    else if (key === 'ArrowRight' && col < 8) newCol++;
    else if (key === 'Backspace' || key === 'Delete') {
      handleCellChange(row, col, '');
      return;
    }

    if (newRow !== row || newCol !== col) {
      const index = newRow * 9 + newCol;
      inputRefs.current[index]?.focus();
    }
  };

  const isCellEditable = (row, col) => {
    return initialBoard[row][col] === 0;
  };

  const isCellPrefilled = (row, col) => {
    return initialBoard[row][col] !== 0;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className="aspect-square w-full border-4 border-foreground rounded-md shadow-xl bg-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(9, 1fr)',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const index = rowIndex * 9 + colIndex;
            const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8;
            const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
            const editable = isCellEditable(rowIndex, colIndex);
            const prefilled = isCellPrefilled(rowIndex, colIndex);

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                ref={el => inputRefs.current[index] = el}
                data-testid={`cell-${rowIndex}-${colIndex}`}
                type="text"
                maxLength="1"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                disabled={!editable}
                className={`
                  w-full h-full text-center text-2xl font-medium
                  border border-border
                  focus:outline-none focus:ring-2 focus:ring-primary focus:z-10
                  transition-colors
                  ${isRightBorder ? 'border-r-2 border-r-foreground' : ''}
                  ${isBottomBorder ? 'border-b-2 border-b-foreground' : ''}
                  ${prefilled ? 'bg-muted font-bold text-foreground cursor-not-allowed' : 'bg-background text-primary hover-elevate'}
                  ${!editable && !prefilled ? 'bg-accent/30 text-foreground' : ''}
                  disabled:cursor-not-allowed
                `}
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield'
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
