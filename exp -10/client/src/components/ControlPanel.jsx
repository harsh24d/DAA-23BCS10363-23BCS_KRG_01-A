import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, RotateCcw, Trash2, Loader2 } from 'lucide-react';

export default function ControlPanel({ 
  onSolve, 
  onClear, 
  onReset, 
  onLoadSample,
  isSolving,
  statusMessage 
}) {
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg">Actions</CardTitle>
          <CardDescription>Solve or modify your puzzle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            data-testid="button-solve"
            onClick={onSolve}
            disabled={isSolving}
            className="w-full"
            size="default"
          >
            {isSolving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Solving...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Solve Puzzle
              </>
            )}
          </Button>
          
          <Button
            data-testid="button-clear"
            onClick={onClear}
            variant="outline"
            className="w-full"
            size="default"
            disabled={isSolving}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Board
          </Button>
          
          <Button
            data-testid="button-reset"
            onClick={onReset}
            variant="ghost"
            className="w-full"
            size="default"
            disabled={isSolving}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Original
          </Button>
        </CardContent>
      </Card>

      {/* Status Message */}
      {statusMessage && (
        <Card className={statusMessage.type === 'success' ? 'border-primary' : statusMessage.type === 'error' ? 'border-destructive' : ''}>
          <CardContent className="pt-6">
            <p 
              data-testid="text-status"
              className={`text-sm font-medium text-center ${
                statusMessage.type === 'success' ? 'text-primary' : 
                statusMessage.type === 'error' ? 'text-destructive' : 
                'text-muted-foreground'
              }`}
            >
              {statusMessage.text}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Sample Puzzles */}
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg">Sample Puzzles</CardTitle>
          <CardDescription>Try these pre-loaded examples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <button
              data-testid="button-sample-easy"
              onClick={() => onLoadSample('easy')}
              disabled={isSolving}
              className="flex flex-col items-center gap-2 p-4 rounded-md border border-border bg-card hover-elevate active-elevate-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Badge variant="secondary" className="text-xs">Easy</Badge>
              <span className="text-xs text-muted-foreground">35+ clues</span>
            </button>
            
            <button
              data-testid="button-sample-medium"
              onClick={() => onLoadSample('medium')}
              disabled={isSolving}
              className="flex flex-col items-center gap-2 p-4 rounded-md border border-border bg-card hover-elevate active-elevate-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Badge variant="secondary" className="text-xs">Medium</Badge>
              <span className="text-xs text-muted-foreground">27-35 clues</span>
            </button>
            
            <button
              data-testid="button-sample-hard"
              onClick={() => onLoadSample('hard')}
              disabled={isSolving}
              className="flex flex-col items-center gap-2 p-4 rounded-md border border-border bg-card hover-elevate active-elevate-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Badge variant="secondary" className="text-xs">Hard</Badge>
              <span className="text-xs text-muted-foreground">&lt;27 clues</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg">How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Enter numbers 1-9 in empty cells</p>
          <p>• Use arrow keys to navigate</p>
          <p>• Click "Solve" to find the solution</p>
          <p>• Try sample puzzles to get started</p>
        </CardContent>
      </Card>
    </div>
  );
}
