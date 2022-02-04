import React from 'react';
import { format } from 'date-fns';

import { Game } from '../interfaces/Game';
import { Constants } from '../constants';
import { getRandomWord } from '../utils/getRandomWord';

export function useGame(): any {
  const games: Game[] = JSON.parse(localStorage.getItem(Constants.GAMES) ?? '[]');

  const [ todaysGame, setTodaysGame ] = React.useState<Game>();

  React.useEffect(createTodaysGame, []);

  function createTodaysGame(): void {
    const date = format(new Date(), 'dd-MM-yyyy');

    const game = games.find((g: Game) => g.date === date);

    if (game) {
      setTodaysGame(game);
      return;
    }

    const newGame: Game = {
      date,
      word: getRandomWord()
    };

    localStorage.setItem(Constants.GAMES, JSON.stringify([ newGame, ...games ]));
    setTodaysGame(newGame);
  }

  const isLoading: boolean = (
    !todaysGame
  );

  return {
    game: todaysGame,
    isLoading
  };
}