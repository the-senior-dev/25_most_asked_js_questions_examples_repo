import React, { useState, useCallback, memo } from 'react';

interface CellData {
  id: string;
  value: string;
  row: number;
  col: number;
}

// Memoized Cell component to prevent unnecessary re-renders
const Cell = memo(({ 
  cell, 
  onCellChange, 
  isSelected,
  onCellFocus 
}: {
  cell: CellData;
  onCellChange: (id: string, value: string) => void;
  isSelected: boolean;
  onCellFocus: (id: string) => void;
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onCellChange(cell.id, e.target.value);
  }, [cell.id, onCellChange]);

  const handleFocus = useCallback(() => {
    onCellFocus(cell.id);
  }, [cell.id, onCellFocus]);

  return (
    <div className={`excel-cell ${isSelected ? 'selected' : ''}`}>
      <input
        type="text"
        value={cell.value}
        onChange={handleChange}
        onFocus={handleFocus}
        className="excel-input"
        placeholder={`${String.fromCharCode(65 + cell.col)}${cell.row + 1}`}
      />
    </div>
  );
});

Cell.displayName = 'Cell';

// Column header component
const ColumnHeader = memo(({ col }: { col: number }) => (
  <div className="excel-header-cell">
    {String.fromCharCode(65 + col)}
  </div>
));

ColumnHeader.displayName = 'ColumnHeader';

// Row header component  
const RowHeader = memo(({ row }: { row: number }) => (
  <div className="excel-row-header">
    {row + 1}
  </div>
));

RowHeader.displayName = 'RowHeader';

export const ExcelForm: React.FC = () => {
  const ROWS = 20;
  const COLS = 10;

  // Initialize data
  const [cells, setCells] = useState<CellData[]>(() => {
    const initialCells: CellData[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        initialCells.push({
          id: `${row}-${col}`,
          value: '',
          row,
          col
        });
      }
    }
    return initialCells;
  });

  const [selectedCell, setSelectedCell] = useState<string>('0-0');
  const [renderCount, setRenderCount] = useState(0);

  // Memoized callback to prevent unnecessary re-renders
  const handleCellChange = useCallback((id: string, value: string) => {
    setCells(prevCells => 
      prevCells.map(cell => 
        cell.id === id ? { ...cell, value } : cell
      )
    );
  }, []);

  const handleCellFocus = useCallback((id: string) => {
    setSelectedCell(id);
  }, []);

  const handleFillSampleData = useCallback(() => {
    setCells(prevCells => 
      prevCells.map(cell => ({
        ...cell,
        value: cell.row === 0 
          ? `Header ${String.fromCharCode(65 + cell.col)}` // Headers
          : `${String.fromCharCode(65 + cell.col)}${cell.row + 1}: ${Math.floor(Math.random() * 1000)}`
      }))
    );
    setRenderCount(prev => prev + 1);
  }, []);

  const handleClearData = useCallback(() => {
    setCells(prevCells => 
      prevCells.map(cell => ({ ...cell, value: '' }))
    );
    setRenderCount(prev => prev + 1);
  }, []);

  const handleForceRerender = useCallback(() => {
    setRenderCount(prev => prev + 1);
  }, []);

  return (
    <div className="excel-container">
      <div className="excel-header">
        <h1 className="excel-title">React Re-render Performance Demo</h1>
        <p className="excel-description">
          Excel-style form with {ROWS * COLS} cells. Notice how memo() prevents unnecessary re-renders.
        </p>
          
          <div className="excel-controls">
            <button className="btn btn-primary" onClick={handleFillSampleData}>
              Fill Sample Data
            </button>
            <button className="btn btn-secondary" onClick={handleClearData}>
              Clear All
            </button>
            <button className="btn btn-destructive" onClick={handleForceRerender}>
              Force Re-render ({renderCount})
            </button>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            Selected: <span className="font-mono font-medium">{selectedCell}</span>
            {selectedCell && (
              <span className="ml-4">
                Cell Value: <span className="font-mono">
                  "{cells.find(c => c.id === selectedCell)?.value || ''}"
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-[48px_repeat(10,120px)] gap-0">
            <div className="h-8 bg-muted border border-border"></div>
            {Array.from({ length: COLS }, (_, col) => (
              <ColumnHeader key={col} col={col} />
            ))}
          </div>

          {/* Data rows */}
          {Array.from({ length: ROWS }, (_, row) => (
            <div key={row} className="grid grid-cols-[48px_repeat(10,120px)] gap-0">
              <RowHeader row={row} />
              {Array.from({ length: COLS }, (_, col) => {
                const cellId = `${row}-${col}`;
                const cell = cells.find(c => c.id === cellId)!;
                return (
                  <Cell
                    key={cellId}
                    cell={cell}
                    onCellChange={handleCellChange}
                    isSelected={selectedCell === cellId}
                    onCellFocus={handleCellFocus}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <h3 className="font-semibold mb-2">Performance Tips:</h3>
          <ul className="space-y-1">
            <li>• Each cell is wrapped in React.memo() to prevent unnecessary re-renders</li>
            <li>• Callbacks are memoized with useCallback()</li>
            <li>• Only the edited cell and selected cell indicators re-render</li>
            <li>• Try editing cells and watch the render count stay low</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
