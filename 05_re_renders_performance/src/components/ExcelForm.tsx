import React, { useState } from 'react';
import Cell from './Cell';

interface CellData {
  id: string;
  value: string;
  row: number;
  col: number;
}

// Column header component
const ColumnHeader = ({ col }: { col: number }) => (
  <div className="excel-header-cell">
    {String.fromCharCode(65 + col)}
  </div>
);

// Row header component  
const RowHeader = ({ row }: { row: number }) => (
  <div className="excel-row-header">
    {row + 1}
  </div>
);

export const ExcelForm: React.FC = () => {
  const ROWS = 100;
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

  const handleCellChange = (id: string, value: string) => {
    setCells(prevCells => 
      prevCells.map(cell => 
        cell.id === id ? { ...cell, value } : cell
      )
    );
  };

  const handleCellFocus = (id: string) => {
    setSelectedCell(id);
  };

  const handleFillSampleData = () => {
    setCells(prevCells => 
      prevCells.map(cell => ({
        ...cell,
        value: cell.row === 0 
          ? `Header ${String.fromCharCode(65 + cell.col)}` // Headers
          : `${String.fromCharCode(65 + cell.col)}${cell.row + 1}: ${Math.floor(Math.random() * 1000)}`
      }))
    );
    setRenderCount(prev => prev + 1);
  };

  const handleClearData = () => {
    setCells(prevCells => 
      prevCells.map(cell => ({ ...cell, value: '' }))
    );
    setRenderCount(prev => prev + 1);
  };

  const handleForceRerender = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-2 min-h-screen max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">React Re-render Performance Demo</h1>
        <p className="text-muted-foreground mb-4">
          Excel-style form with {ROWS * COLS} cells. Clean components without memoizations to show natural re-render behavior.
        </p>
          
          <div className="flex gap-3 mb-4">
            <button className="btn btn-default" onClick={handleFillSampleData}>
              Fill Sample Data
            </button>
            <button className="btn btn-outline" onClick={handleClearData}>
              Clear All
            </button>
            <button className="btn btn-destructive" onClick={handleForceRerender}>
              Force Re-render ({renderCount})
            </button>
          </div>

          <div className="text-sm text-muted-foreground mb-4 p-3 bg-card border rounded-lg">
            Selected: <code className="font-mono font-medium">{selectedCell}</code>
            {selectedCell && (
              <span className="ml-4">
                Cell Value: <code className="font-mono">
                  "{cells.find(c => c.id === selectedCell)?.value || ''}"
                </code>
              </span>
            )}
          </div>
        </div>

        <div className="excel-grid">
          {/* Header row */}
          <div className="excel-row">
            <div className="excel-header-cell"></div>
            {Array.from({ length: COLS }, (_, col) => (
              <ColumnHeader key={col} col={col} />
            ))}
          </div>

          {/* Data rows */}
          {Array.from({ length: ROWS }, (_, row) => (
            <div key={row} className="excel-row">
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
      </div>
  );
};
