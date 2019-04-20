import React from 'react';
import styles from './EntryPlaceholder.module.css';

function EntryPlaceholder() {
    return <div className={styles.container}>
                <div className={styles.ldsring}><div></div><div></div><div></div><div></div></div>
            </div>;
  }

export default EntryPlaceholder;