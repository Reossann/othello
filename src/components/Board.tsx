import styles from '../app/page.module.css';
import { Cell } from './Cell';

type BoardProps = {
  board: number[][];
  onClick: (x: number, y: number) => void;
};

export const Board = ({ board, onClick }: BoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((row, y) =>
        row.map((color, x) => (
          <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
        )),
      )}
    </div>
  );
};
