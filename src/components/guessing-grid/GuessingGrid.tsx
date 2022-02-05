import React from 'react';

import { CellRows } from '../../hooks/useCells';
import { Cell } from '../../interfaces/Cell';
import { CellStatus } from '../enums/CellStatus';

import './guessing-grid.css';

function getColourClass(cell: Cell): string {
  switch (cell.status) {
    case CellStatus.InWordInPlace:
      return 'correct';
    case CellStatus.InWordNotInPlace:
      return 'partially-correct';
    case CellStatus.NotInWord:
      return 'incorrect';
    default:
      return '';
  }
}

interface GuessingGridProps {
  cellRows: CellRows;
}

export function GuessingGrid(props: GuessingGridProps): JSX.Element {
  return (
    <div className='grid'>
      {props.cellRows.map((row, i) => {
        return row.map((cell, j) => {
          return (
            <div className={`cell ${getColourClass(cell)}`} key={`${i}:${j}`}>{cell.value}</div>
          )
        })
      })}
    </div>
  );
}