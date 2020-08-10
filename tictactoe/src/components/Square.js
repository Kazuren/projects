import React from 'react';
import styles from './square.module.scss'

export default function Square(props) {
  return (
    <button className={[styles.square, props.highlighted ? styles.highlighted : ''].join(' ')} onClick={props.onClick}>
      {props.value}
    </button>
  )
}
