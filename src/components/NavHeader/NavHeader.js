import React, { Component } from 'react';
import '../../App.css';

import styles from '../../components/NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){
        return(
            <div className={styles.navHeader}>
                <h2>Huego.</h2>
                <div className={styles.navHeaderLinks}>
                    <a href='/'><h5 className={styles.navHeaderLink}>Home</h5></a>
                    <a href='/profile'><h5 className={styles.navHeaderLink}>Profile</h5></a>
                    <a href='/'><h5 className={styles.navHeaderLink}>Log Out</h5></a>
                </div>
            </div>
        )
    }
}

export default NavHeader;