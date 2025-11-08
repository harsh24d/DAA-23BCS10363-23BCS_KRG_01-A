import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import SudokuGrid from '@/components/SudokuGrid';
import ControlPanel from '@/components/ControlPanel';
import { createEmptyBoard, samplePuzzles } from '@shared/schema';

export default function Home() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [initialBoard, setInitialBoard] = useState(createEmptyBoard());
  const [statusMessage, setStatusMessage] = useState(null);

  const solveMutation = useMutation({
    mutationFn: async (puzzleBoard) => {
      const response = await apiRequest('POST', '/api/solve', { board: puzzleBoard });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.solution) {
        setBoard(data.solution);
        setStatusMessage({ type: 'success', text: 'Puzzle solved successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'No solution exists for this puzzle' });
      }
    },
    onError: () => {
      setStatusMessage({ type: 'error', text: 'Failed to solve puzzle. Please try again.' });
    }
  });

  const handleSolve = () => {
    // Snapshot the current board state before solving so Reset works correctly
    setInitialBoard(board.map(row => [...row]));
    setStatusMessage({ type: 'info', text: 'Solving puzzle...' });
    solveMutation.mutate(board);
  };

  const handleClear = () => {
    const emptyBoard = createEmptyBoard();
    setBoard(emptyBoard);
    setInitialBoard(emptyBoard);
    setStatusMessage(null);
  };

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row]));
    setStatusMessage(null);
  };

  const handleLoadSample = (difficulty) => {
    const sample = samplePuzzles[difficulty];
    const sampleCopy = sample.map(row => [...row]);
    setBoard(sampleCopy);
    setInitialBoard(sampleCopy);
    setStatusMessage({ type: 'info', text: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} puzzle loaded. Click "Solve" to find the solution.` });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <h1 data-testid="text-title" className="text-3xl md:text-4xl font-bold text-foreground">
              Sudoku Solver
            </h1>
            <p data-testid="text-tagline" className="text-base md:text-lg text-muted-foreground">
              Powered by backtracking algorithms
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <span data-testid="badge-feature-instant" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Instant Solving
              </span>
              <span data-testid="badge-feature-difficulty" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                All Difficulty Levels
              </span>
              <span data-testid="badge-feature-visualization" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Clear Visualization
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Sudoku Grid */}
          <div className="flex flex-col items-center">
            <SudokuGrid 
              board={board} 
              onBoardChange={setBoard}
              initialBoard={initialBoard}
            />
          </div>

          {/* Control Panel */}
          <div>
            <ControlPanel
              onSolve={handleSolve}
              onClear={handleClear}
              onReset={handleReset}
              onLoadSample={handleLoadSample}
              isSolving={solveMutation.isPending}
              statusMessage={statusMessage}
            />
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 data-testid="text-footer-title" className="text-lg font-semibold text-foreground mb-3">
              How It Works
            </h2>
            <p data-testid="text-footer-description-1" className="text-sm text-muted-foreground leading-relaxed mb-3">
              This Sudoku solver uses a <strong>backtracking algorithm</strong> to find solutions. 
              The algorithm systematically tries possible numbers in empty cells, backtracking when 
              it encounters conflicts, until it finds a valid solution or determines that no solution exists.
            </p>
            <p data-testid="text-footer-description-2" className="text-sm text-muted-foreground leading-relaxed">
              The algorithm efficiently handles puzzles of all difficulty levels, from easy puzzles 
              with many clues to hard puzzles with minimal starting numbers. Time complexity varies 
              based on puzzle difficulty, but most puzzles solve in milliseconds.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
