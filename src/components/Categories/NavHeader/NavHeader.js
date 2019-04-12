import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import '../../../App.css';
import styles from '../../../components/Categories/NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){
        return(
            <div className={styles.navHeader}>
                <h2>Huego.</h2>
                <div className={styles.navHeaderLinks}>
                    <Link to='/' className={styles.navHeaderLink}><h5>Home</h5></Link>
                    <Link to='/profile' className={styles.navHeaderLink}><h5>Profile</h5></Link>
                </div>
            </div>
        )
    }
}

export default NavHeader;