'use client';

import { useState } from 'react';
import { Board } from '../components/Board'; // Boardコンポーネントをインポート
import { LeftPanel } from '../components/LeftPanel'; // LeftPanelをインポート
import { RightPanel } from '../components/RightPanel'; // RightPanelをインポート
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
//ひっくり返す関数
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
          if (
            board[y + dy * num1] === undefined ||
            board[y + dy * num1][x + dx * num1] === 0 ||
            board[y + dy * num1][x + dx * num1] === 3
          ) {
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
//候補地出すやつ
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
//結果出すやつ（結構脳筋）
const result = (a: number, b: number, c: number, d: number) => {
  if (c === undefined && d === undefined) {
    if (a > b) {
      const tx = '黒勝利！！';
      return tx;
    }
    if (a < b) {
      const tx = '白勝利！！';
      return tx;
    }
  }
  if (d === undefined) {
    const tx = '強制終了だす';
    return tx;
  }
  if (a === b) {
    const tx = '均衡中。。。';
    return tx;
  }

  if (a < b) {
    const tx = '白優勢！！';
    return tx;
  }
  if (a > b) {
    const tx = '黒優勢！！';
    return tx;
  }
};
let passcounter = 0;
//やり直しボタン
const restart = () => {
  location.reload();
};
const back = () => {
  history.back();
};
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
  //ここでpをmapで読み取れるようにしてる
  const p = vision(board, turnColor);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== undefined) {
      console.log(x, y);
      const p = turn(board, y, x, directions, turnColor);
      const primB: boolean = flag.b;
      if (primB) {
        const m = vision(p, 2 / turnColor);
        setTurnColor(2 / turnColor);
        return setBoard(m);
      }
      const m = vision(p, turnColor);
      setBoard(m);
    }
  };
  const pass = () => {
    const newBoard = structuredClone(board);
    const m = vision(newBoard, 2 / turnColor);
    setTurnColor(2 / turnColor);
    return setBoard(m);
  };
  //ここで盤面の駒数数えてる
  type CountMap = Record<number, number>;
  const flat = p.flat();
  const counts = flat.reduce<CountMap>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as CountMap);
  const count1 = counts[1] === undefined ? 0 : counts[1];
  const count2 = counts[2] === undefined ? 0 : counts[2];
  const txs = result(counts[1], counts[2], counts[0], counts[3]);
  //勝利したのがわかったら終わらせる
  let timer = 4;
  if (txs === '白勝利！！') {
    setInterval(() => {
      timer -= 1;
      if (timer === 0) {
        location.reload();
      }
    }, 1000);
  }
  if (txs === '黒勝利！！') {
    setInterval(() => {
      timer -= 1;
      if (timer === 0) {
        location.reload();
      }
    }, 1000);
  }
  //強制終了のやつ
  if (counts[0] <= 58 && counts[3] === undefined) {
    if (passcounter !== 2) {
      passcounter += 1;
      if (passcounter === 2) {
        return clickHandler(4, 4);
      }
      return pass;
    }
  }

  return (
    <div className={styles.container}>
      <LeftPanel score={count1} resultText={txs ?? ''} onBack={back} />
      <Board board={p} onClick={clickHandler} />
      <RightPanel score={count2} onPass={pass} onRestart={restart} />
    </div>
  );
}
