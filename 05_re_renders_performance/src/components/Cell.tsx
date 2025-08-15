import React from 'react';

interface CellData {
  id: string;
  value: string;
  row: number;
  col: number;
}

interface CellProps {
  cell: CellData;
  onCellChange: (id: string, value: string) => void;
  isSelected: boolean;
  onCellFocus: (id: string) => void;
}

const Cell: React.FC<CellProps> = ({ 
  cell, 
  onCellChange, 
  isSelected,
  onCellFocus 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCellChange(cell.id, e.target.value);
  };

  const handleFocus = () => {
    onCellFocus(cell.id);
  };

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
};

export default React.memo(Cell);
