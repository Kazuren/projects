import React from 'react';
import Helmet from "react-helmet";
import styles from './home.module.scss'
import Game from '../components/Game'

export default function Home(props) {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className={styles.container}>
        <Game/>
      </div>
    </>
  )
}
