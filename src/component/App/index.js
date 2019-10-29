import styles from './styles.module.scss';

import React from 'react';
import SubComponent from '../SubComponent';
import img from './omg.jpg';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.header} myHeading`}>Hello React Application</h1>
      <SubComponent msg="Greetings" />
      <img className={styles.image} src={img} alt="" />
    </div>
  );
}

export default App;
