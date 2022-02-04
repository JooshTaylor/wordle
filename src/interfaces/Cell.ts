import { CellStatus } from "../components/enums/CellStatus";

export interface Cell {
  value: string;
  status: CellStatus;
}