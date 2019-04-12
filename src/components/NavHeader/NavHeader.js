import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


import '../../App.css';

import styles from '../../components/NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){
        return(
            <div className={styles.navHeader}>
                <h2>Huego.</h2>
                <div className={styles.navHeaderLinks}>
                    <Link to='/'><h5 className={styles.navHeaderLink}>Home</h5></Link>
                    <Link to='/profile'><h5 className={styles.navHeaderLink}>Profile</h5></Link>
                    <Link to='/'><h5 className={styles.navHeaderLink}>Log Out</h5></Link>
                </div>
            </div>
        )
    }
}

export default NavHeader;