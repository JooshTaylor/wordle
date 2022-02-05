import React from 'react';
import { CellStatus } from '../components/enums/CellStatus';
import { Constants } from '../constants';

import { Cell } from '../interfaces/Cell';
import { Game } from '../interfaces/Game';

export type CellRows = Cell[][];

function getCurrentRowIndex(cellRows: CellRows): number {
  return cellRows.findIndex(row => {
    return !row.find(cell => (
      cell.status === CellStatus.InWordInPlace ||
      cell.status === CellStatus.InWordNotInPlace ||
      cell.status === CellStatus.NotInWord
    ));
  });
}

function getCurrentCellIndex(cellRows: CellRows): number {
  const rowIndex = getCurrentRowIndex(cellRows);

  return cellRows[rowIndex].findIndex(cell => cell.status === CellStatus.Empty);
}

export const useCells = (game: Game) => {
  const [ cellRows, setCellRows ] = React.useState<CellRows>(createCells());

  function createCells(): CellRows {
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
    const currentGuessRowIndex = getCurrentRowIndex(cellRows);
    const currentGuessCellIndex = getCurrentCellIndex(cellRows);

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
    const currentGuessRowIndex = getCurrentRowIndex(cellRows);

    const row = cellRows[currentGuessRowIndex];

    const guessWordArray = row.map(cell => cell.value);
    const guessWord = guessWordArray.join('');

    if (guessWord.length < Constants.MAX_WORD_LENGTH)
      return;

    if (guessWord === game.word) {
      // Win
      return;
    }

    // If incorrect

    const gameWordArray = game.word.split('');

    const newCellRows = cellRows.map((cellRow, cellRowIndex) => {
      if (cellRowIndex < currentGuessRowIndex)
        return cellRow;

      if (cellRowIndex === currentGuessRowIndex) {
        return cellRow.map((cell, cellIndex) => {
          const isInPlace = cell.value === gameWordArray[cellIndex];

          if (isInPlace) {
            return {
              ...cell,
              status: CellStatus.InWordInPlace
            };
          }

          const isInWord = gameWordArray.find(char => char === cell.value);

          if (isInWord) {
            return {
              ...cell,
              status: CellStatus.InWordNotInPlace
            };
          }

          return {
            ...cell,
            status: CellStatus.NotInWord
          };
        });
      }

      if (cellRowIndex === currentGuessRowIndex + 1) {
        return cellRow.map(cell => ({
          ...cell,
          status: CellStatus.Empty
        }));
      }

      return cellRow;
    });

    setCellRows(newCellRows);
  }

  const isLoading = !cellRows?.length;

  return {
    cellRows,
    selectCharacter,
    submitWord,
    isLoading
  };
};