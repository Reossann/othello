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
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, +1],
    [+1, +1],
    [+1, 0],
    [+1, -1],
  ];
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;

    for (let i = 0; i < directions.length; i++)
      if (board[y + 1] !== undefined && board[y + 1][x] === 2 / turnColor) {
        for (let num1 = 0; num1 < 8; num1++) {
          if (board[y + 1 + num1][x] === turnColor) {
            newBoard[y][x] = turnColor;
            for (let num = 0; num < num1; num++) {
              newBoard[y + 1 + num][x] = turnColor;
            }

            setTurnColor(2 / turnColor);
            setBoard(newBoard);
            break;
          }
        }
      }

    if (board[y + 1][x + 1] !== undefined && board[y + 1][x + 1] === 2 / turnColor) {
      newBoard[y][x + 1] = turnColor;
      newBoard[y + 1][x + 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] === 2 / turnColor) {
      newBoard[y][x + 1] = turnColor;
      newBoard[y - 1][x + 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] === 2 / turnColor) {
      newBoard[y][x - 1] = turnColor;
      newBoard[y + 1][x - 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[y - 1][x - 1] !== undefined && board[y - 1][x - 1] === 2 / turnColor) {
      newBoard[y][x - 1] = turnColor;
      newBoard[y - 1][x - 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[y - 1] !== undefined && board[y - 1][x] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[x + 1] !== undefined && board[y][x + 1] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y][x + 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
    if (board[x - 1] !== undefined && board[y][x - 1] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
      newBoard[y][x - 1] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
