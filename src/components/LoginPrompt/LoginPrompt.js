import React, {Component} from 'react';

import '../../App.css'
import styles from './LoginPrompt.module.css';

class LoginPrompt extends Component{

        render(){
                return (
                        <div className={styles.overlay}>
                                <div className={styles.promptModal}>
                                        <h1>Login, mate.</h1>
                                        <h5>You need to log in to submit an entry.</h5>
                                        <button className={styles.promptButton}>Log in</button>
                                        <a href="#">Create an account</a>
                                </div>     
                        </div>
                )
        }
}

export default LoginPrompt;