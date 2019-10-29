import styles from './styles.module.scss';
import React from 'react';

function SubComponent({ msg = 'Hello' }) {
  return <p className={styles.message}>{msg}</p>;
}

export default SubComponent;
