import React, { useState } from 'react';
import styles from './game.module.scss'
import Board from './Board'

export default function Game(props) {
  const [history, setHistory] = useState([
    {
      squares: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      row: null,
      col: null,
    }
  ])
  const [ascending, setAscending] = useState(true)
  const [xIsNext, setXisNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  function newGame() {
    jumpTo(0)
    const _history = history.slice(0, 1)
    setHistory(_history)
  }

  function jumpTo(step) {
    setStepNumber(step)
    setXisNext((step % 2) === 0)
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const [a1, b1, c1] = [squares[~~(a/3)][a % 3], squares[~~(b/3)][b % 3], squares[~~(c/3)][c % 3]]
      if (a1 && a1 === b1 && a1 === c1) {
        return {
          winner: a1,
          line: [{y: ~~(a/3), x: a % 3}, {y: ~~(b/3), x: b % 3}, {y: ~~(c/3), x: c % 3}]
        }
      }
    }
    return null;
  }

  function handleClick(x, y) {
    const _history = history.slice(0, stepNumber + 1)
    const current = _history[_history.length - 1]
    const squares = deepCopy(current.squares).slice() // We have to deep copy because we're using a 2D array

    if (calculateWinner(squares) || squares[y][x]) { return }

    squares[y][x] = xIsNext ? 'X' : 'O'

    setHistory(_history.concat([{
      squares: squares,
      row: y + 1,
      col: x + 1
    }]))
    setStepNumber(_history.length)
    setXisNext(!xIsNext)
  }

  const current = history[stepNumber]
  const info = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    // const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <>
        <div className={styles.historyMove}>
          <div className={styles.historyInfo}>Column: {history[move].col} Row: {history[move].row}</div>
          <div className={[styles.historyBoard, stepNumber === move ? styles.active : ''].join(' ')}>
            <Board key={move} squares={history[move].squares} onClick={() => jumpTo(move)}/>
          </div>
        </div>
      </>
    );
  })

  let status
  // if the stepNumber is equal to the size of the 2D array(9) then it's a draw
  const draw = stepNumber === current.squares.length * current.squares[0].length
  if (info) {
    status = 'Winner: ' + info.winner
  }
  else if (draw) {
    status = 'Draw'
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className={styles.game}>
      { (info?.winner || draw) ? <button onClick={newGame} className={styles.newGameButton}>New Game</button> : <div className={styles.status}>{status}</div>}
      <Board winLine={info?.line} squares={current.squares} onClick={(x, y) => handleClick(x, y)}/>
      <button className={styles.sortButton} onClick={() => setAscending(!ascending)}>{ascending ? 'Ascending' : 'Descending'}</button>
      <div className={styles.history}>{ascending ? moves : moves.reverse()}</div>
    </div>
  )
}

function deepCopy(inObject) {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value)
  }

  return outObject
}
