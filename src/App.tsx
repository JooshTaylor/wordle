import React from 'react';

import { GuessingGrid } from './components/guessing-grid/GuessingGrid';
import { Keyboard } from './components/keyboard/Keyboard';

import { useCells } from './hooks/useCells';
import { useGame } from './hooks/useGame';

export function App(): JSX.Element {
  const { game, isLoading: isLoadingGame } = useGame();
  const {
    cellRows,
    selectCharacter,
    deleteCharacter,
    submitWord,
    isLoading: isLoadingCells
  } = useCells(game);

  if (isLoadingGame || isLoadingCells)
    return <>Loading...</>;

  return (
    <div>
      <GuessingGrid cellRows={cellRows} />

      <Keyboard selectCharacter={selectCharacter} deleteCharacter={deleteCharacter} submitWord={submitWord} />
    </div>
  );
}