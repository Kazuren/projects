import React from 'react';
import styles from './board.module.scss'
import Square from './Square'

export default function Board(props) {
  function renderSquare(x, y) {
    const winLine = props.winLine
    const highlighted = winLine && winLine.some((line) => line.x === x && line.y === y)
    return <Square key={`${x}-${y}`} highlighted={highlighted} value={props.squares[y][x]} onClick={() => props.onClick(x, y)}/>
  }

  return (
    <div className={styles.squares}>
      {props.squares.map((row, y) => {
        return row.map((square, x) => {
          return renderSquare(x, y)
        })
      })}
    </div>
  )
}
