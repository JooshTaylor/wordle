import React from 'react';

import { Cell } from '../interfaces/Cell';

export const useCells = () => {
  const [ cellRows, setCellRows ] = React.useState<Cell[][]>(createCells());

  function createCells(): Cell[][] {
    const emptyCell: Cell = {
      value: ''
    };

    const newCellRows = [
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ],
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ],
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ],
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ],
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ],
      [ emptyCell, emptyCell, emptyCell, emptyCell, emptyCell ]
    ];

    return newCellRows;
  }

  function setCell(): void {
    
  }

  const isLoading = !cellRows?.length;

  return {
    cellRows,
    setCell,
    isLoading
  };
};