import React from 'react';

import { Cell } from '../../interfaces/Cell';

import './guessing-grid.css';

interface GuessingGridProps {
  cellRows: Cell[][];
}

export function GuessingGrid(props: GuessingGridProps): JSX.Element {
  return (
    <div className='grid'>
      {props.cellRows.map((row, i) => {
        return row.map((cell, j) => {
          return (
            <div className='cell' key={`${i}:${j}`}>{cell.value}</div>
          )
        })
      })}
    </div>
  );
}