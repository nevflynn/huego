import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CategoryOrderToggle from '../NavHeader/CategoryOrderToggle/CategoryOrderToggle';
import '../../App.css';
import styles from '../NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){
        return(
            <div className={styles.navHeader}>
            <div className={styles.navHeaderLeft}>
                <Link to='/' className="mainLogo"><h2>Huego.</h2></Link>
                <CategoryOrderToggle></CategoryOrderToggle>
            </div>
                <div className={styles.navHeaderLinks}>
                    <Link to='/' className={styles.navHeaderLink}><h5>Home</h5></Link>
                    <Link to='/profile' className={styles.navHeaderLink}><h5>Profile</h5></Link>
                </div>
            </div>
        )
    }
}

export default NavHeader;