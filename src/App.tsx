import React from 'react';
import { GuessingGrid } from './components/guessing-grid/GuessingGrid';
import { useCells } from './hooks/useCells';

import { useGame } from './hooks/useGame';

export function App(): JSX.Element {
  const { game, isLoading: isLoadingGame } = useGame();
  const { cellRows, setCell, isLoading: isLoadingCells } = useCells();

  if (isLoadingGame || isLoadingCells)
    return <>Loading...</>;

  return (
    <div>
      <GuessingGrid cellRows={cellRows} />

      {/* <Keyboard setCell={setCell} /> */}
    </div>
  );
}