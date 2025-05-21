'use client';

import { useState } from 'react';
import styles from './page.module.css';
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
const flag = { b: false };
const turn = (
  board: number[][],
  y: number,
  x: number,
  directions: number[][],
  turnColor: number,
) => {
  const newBoard = structuredClone(board);
  const flagB = flag;
  flagB.b = false;

  if (board[y][x] === 0 || board[y][x] === 3) {
    for (const [dy, dx] of directions) {
      if (board[y + dy] !== undefined && board[y + dy][x + dx] === 2 / turnColor) {
        for (let num1 = 1; num1 < 9; num1++) {
          if (board[y + dy * num1] === undefined || board[y + dy * num1][x + dx * num1] === 0) {
            break;
          }
          if (board[y + dy * num1][x + dx * num1] === turnColor) {
            flagB.b = true;
            newBoard[y][x] = turnColor;
            for (let num = 1; num < num1; num++) {
              newBoard[y + dy * num][x + dx * num] = turnColor;
            }
            break;
          }
        }
      }
    }
  }
  return newBoard;
};

const vision = (board: number[][], turnColor: number) => {
  const newBoard = structuredClone(board);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (newBoard[y][x] === 3) {
        newBoard[y][x] = 0;
      }
    }
  }
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (newBoard[y][x] === 0) {
        for (const [dy, dx] of directions) {
          if (board[y + dy] !== undefined && board[y + dy][x + dx] === 2 / turnColor) {
            for (let num1 = 1; num1 < 9; num1++) {
              if (
                board[y + dy * num1] === undefined ||
                board[y + dy * num1][x + dx * num1] === 0 ||
                board[y + dy * num1][x + dx * num1] === 3
              ) {
                break;
              }
              if (board[y + dy * num1][x + dx * num1] === turnColor) {
                newBoard[y][x] = 3;
              }
            }
          }
        }
      }
    }
  }
  return newBoard;
};

const result = (a: number, b: number, c: number, d: number, e: number, f: number) => {
  if (e === 5) {
    const tx = '白圧勝！！';
    return tx;
  }
  if (f === 5) {
    const tx = '黒圧勝！！';
    return tx;
  }
  if (d === undefined) {
    const tx = '強制終了だす';
    return tx;
  }
  if (a === b) {
    const tx = '均衡中。。。';
    return tx;
  }
  if (c === undefined) {
    if (a > b) {
      const tx = '黒勝利！！';
      return tx;
    }
    if (a < b) {
      const tx = '白勝利！！';
      return tx;
    }
  }
  if (a < b) {
    const tx = '白優勢！！！！';
    return tx;
  }
  if (a > b) {
    const tx = '黒優勢！！！！';
    return tx;
  }
};
let passcounter = 0;
let bpass = 0;
let wpass = 0;
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
  const p = vision(board, turnColor);
  console.log(p);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== undefined) {
      console.log(x, y);
      const p = turn(board, y, x, directions, turnColor);
      const primB: boolean = flag.b;
      if (primB) {
        if (turnColor === 1) {
          bpass = 0;
        }
        if (turnColor === 2) {
          wpass = 0;
        }

        console.log(primB);
        const m = vision(p, 2 / turnColor);
        setTurnColor(2 / turnColor);
        return setBoard(m);
      }

      const m = vision(p, turnColor);
      setBoard(m);
      console.log(100);
    }
  };
  const pass = () => {
    if (turnColor === 1) {
      bpass += 1;
    }
    if (turnColor === 2) {
      wpass += 1;
    }
    const newBoard = structuredClone(board);
    const m = vision(newBoard, 2 / turnColor);
    setTurnColor(2 / turnColor);
    console.log(10);
    return setBoard(m);
  };

  type CountMap = Record<number, number>;
  const flat = p.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);
  console.log(counts[0]);
  console.log(counts[1]);
  console.log(counts[2]);
  console.log(counts[3]);
  console.log(1000);
  console.log(bpass);
  const count1 = counts[1];
  const count2 = counts[2];
  const txs = result(counts[1], counts[2], counts[0], counts[3], bpass, wpass);
  if (counts[0] <= 58 && counts[3] === undefined) {
    if (passcounter !== 2) {
      passcounter += 1;
      console.log(passcounter);
      if (passcounter === 2) {
        return clickHandler(4, 4);
      }
      return pass;
    }
  }
  if (bpass === 3) {
    bpass = 5;
    return result(counts[1], counts[2], counts[0], counts[3], bpass, wpass);
  }
  if (wpass === 3) {
    wpass = 5;
    return result(counts[1], counts[2], counts[0], counts[3], bpass, wpass);
  }

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
      <div className={styles.scoreBoard3}>
        <div onClick={pass}>
          <p style={{ color: 'purple', fontSize: 100 }}>パス</p>
        </div>
      </div>
      <div className={styles.scoreBoard4}>
        <p style={{ color: 'purple', fontSize: 100 }}>{txs}</p>
      </div>
      <div className={styles.board}>
        {p.map((row, y) =>
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
