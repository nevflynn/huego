import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import styles from '../NavHeader/NavHeader.module.css';
import hexieLogo from '../../img/hexie-logo.svg';

class NavHeader extends Component {
    render(){

        var loginButton;
        if(!localStorage.getItem('token')){
            loginButton = <Link to='/login' className={styles.navHeaderLink}><h5>Login</h5></Link>
        } else {
            loginButton = <Link to='/profile' className={styles.navHeaderLink}><h5>Profile</h5></Link>
        }

        return(
            <div className={styles.navHeader}>
            <div className={styles.navHeaderLeft}>
                <Link to='/' className="mainLogo"><img src={hexieLogo} className={styles.hexieLogo}></img></Link>
            </div >
                <div className={styles.navHeaderLinks}>
                    <Link to='/' className={styles.navHeaderLink}><h5>Home</h5></Link>
                    {/* <Link to='/profile' className={styles.navHeaderLink}><h5>Profile</h5></Link> */}
                    {loginButton}
                </div>
            </div>
        )
    }
}

export default NavHeader;

// if(localStorage.getItem(this.props.id)){
//     this.setState({likeButtonClicked:true})
// } else {
//     this.setState({likeButtonClicked:false})
// }