import { GameResult } from "./GameResult";

export interface Game {
  date: string;
  word: string;
  completed?: boolean;
  result?: GameResult;
}