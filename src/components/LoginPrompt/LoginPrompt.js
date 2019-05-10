import React, {Component} from 'react';
import { Link } from 'react-router-dom';


import '../../App.css'
import modalHeader from '../../img/modal-style-1.png';
import styles from './LoginPrompt.module.css';

class LoginPrompt extends Component{

        render(){
                return (
                        <div className={styles.overlay} onClick={this.props.closeLogin}>
                                <div className={styles.promptModal}>
                                        <img src={modalHeader}></img>
                                        <div className={styles.modalInner}>
                                                <h1>Easy now.</h1>
                                                <h4>You need to have an account to submit an entry.</h4>
                                                <Link to='/login' className={styles.promptButton}>Log in</Link>
                                                <Link to='/register' className={styles.createAccount}>Create an account</Link>
                                        </div>
                                </div>     
                        </div>
                )
        }
}

export default LoginPrompt;