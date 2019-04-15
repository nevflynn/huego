import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import CategoryOrderToggle from '../NavHeader/CategoryOrderToggle/CategoryOrderToggle';
import '../../App.css';
import styles from '../NavHeader/NavHeader.module.css';

class NavHeader extends Component {
    render(){

        var hideToggle;
        var currentPath = this.props.location.pathname;
        if (currentPath !== '/'){
                hideToggle = styles.hideToggle;
        } else {
            console.log('Goodbye1');
                hideToggle = null;
        }

        return(
            <div className={styles.navHeader}>
            <div className={styles.navHeaderLeft}>
                <Link to='/' className="mainLogo"><h2>Huego.</h2></Link>
                <div className={hideToggle}><CategoryOrderToggle filterCategories={this.props.filterCategories}></CategoryOrderToggle></div>
            </div >
                <div className={styles.navHeaderLinks}>
                    <Link to='/' className={styles.navHeaderLink}><h5>Home</h5></Link>
                    <Link to='/profile' className={styles.navHeaderLink}><h5>Profile</h5></Link>
                </div>
            </div>
        )
    }
}

export default withRouter(NavHeader);