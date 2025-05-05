'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;
    let i: number = 0;
    if (board[y][x] === 0) {
      for (const [dy, dx] of directions) {
        console.log(dy, dx);
        if (board[y + dy] !== undefined && board[y + dy][x + dx] === 2 / turnColor) {
          for (let num1 = 1; num1 < 9; num1++) {
            if (board[y + dy * num1] === undefined || board[y + dy * num1][x + dx * num1] === 0) {
              break;
            }
            if (board[y + dy * num1][x + dx * num1] === turnColor) {
              newBoard[y][x] = turnColor;
              for (let num = 1; num < num1; num++) {
                newBoard[y + dy * num][x + dx * num] = turnColor;
                setBoard(newBoard);
                i = 2;
              }
              break;
            }
          }
        }
      }

      if (i > 1) {
        setTurnColor(2 / turnColor);
        i = 1;
      }
    }
  };
  type CountMap = Record<number, number>;
  const flat = board.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);
  console.log(counts[0]);
  console.log(counts[1]);
  const count1 = counts[1];
  const count2 = counts[2];
  return (
    <div className={styles.container}>
      <div className={styles.scoreBoard}>
        <div className={styles.score}>
          <div className={styles.count}>{count1}</div>
        </div>
      </div>
      <div className={styles.scoreBoard2}>
        <div className={styles.score2}>
          <div className={styles.count}>{count2}</div>
        </div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#00f' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
