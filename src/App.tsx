import React from 'react';

import { useGame } from './hooks/useGame';

export function App(): JSX.Element {
  const { game, isLoading } = useGame();

  if (isLoading)
    return <>Loading...</>;

  return (
    <div>
      {game.date}
    </div>
  );
}