import React from 'react';
import { CellStatus } from '../components/enums/CellStatus';
import { Constants } from '../constants';

import { Cell } from '../interfaces/Cell';

export const useCells = () => {
  const [ cellRows, setCellRows ] = React.useState<Cell[][]>(createCells());

  function createCells(): Cell[][] {
    const emptyCellFirstRow: Cell = {
      value: '',
      status: CellStatus.Empty
    };

    const emptyCellOther: Cell = {
      value: '',
      status: CellStatus.Disabled
    };

    const newCellRows = [
      [ emptyCellFirstRow, emptyCellFirstRow, emptyCellFirstRow, emptyCellFirstRow, emptyCellFirstRow ],
      [ emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther ],
      [ emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther ],
      [ emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther ],
      [ emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther ],
      [ emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther, emptyCellOther ]
    ];

    return newCellRows;
  }

  function selectCharacter(character: string): void {
    const currentGuessRowIndex = cellRows.findIndex(row => {
      return !row.find(cell => (
        cell.status === CellStatus.InWordInPlace ||
        cell.status === CellStatus.InWordNotInPlace ||
        cell.status === CellStatus.NotInWord
      ));
    });

    const currentGuessCellIndex = cellRows[currentGuessRowIndex].findIndex(cell => cell.status === CellStatus.Empty);

    setCellRows(currentVal => {
      return currentVal.map((row, rowIndex) => {
        if (rowIndex !== currentGuessRowIndex)
          return row;

        return row.map((cell, cellIndex) => {
          if (cellIndex !== currentGuessCellIndex)
            return cell;

          return {
            value: character,
            status: CellStatus.Filled
          };
        });
      });
    });
  }

  function submitWord(): void {

  }

  const isLoading = !cellRows?.length;

  return {
    cellRows,
    selectCharacter,
    submitWord,
    isLoading
  };
};