import React, { Component } from 'react';
import '../../App.css';

import styles from '../../components/NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){
        return(
            <div className={styles.navHeader}>
                <h2>Huego.</h2>
                <div className={styles.navHeaderLinks}>
                    <h5 className={styles.navHeaderLink}>Profile</h5>
                    <h5 className={styles.navHeaderLink}>Log Out</h5>
                </div>
            </div>
        )
    }
}

export default NavHeader;