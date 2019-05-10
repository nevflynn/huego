import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import loginIcon from '../../img/login-icon.svg';
import styles from '../Login/Login.module.css';

class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          loginStatus:false,
          displayError: false
        };
      }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.username);
        axios.post('http://localhost:5000/api/users/login', {
            username: this.state.username,
            password: this.state.password
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setState({loginStatus:true});
          })
          .catch((error) => {
            console.log(error);
            this.setState({displayError:true});
          });
        
    }

    render(){

        if (this.state.loginStatus){
            return <Redirect to='/'></Redirect>
        } 
        
        return(
            <div className={styles.login}>
                <div className={styles.loginModal}>
                    <img src={loginIcon} className={styles.loginIcon}></img>
                    <div className={styles.errorMessage} style={ { display: this.state.displayError ? 'flex' : 'none' } }>Incorrect username or password</div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input className={styles.input} placeholder="Username" onChange={this.handleChange} value={this.state.email} id="username" autoFocus></input>
                        <label htmlFor="username">Password</label>
                        <input className={styles.input} type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} id="password"></input>
                        <button className={styles.loginButton} type="submit" >Login</button>
                    </form>
                    <a href="#" className={styles.forgotPassword}>Having trouble logging in?</a>
                </div>
            </div>
        )
    }
}

export default Login;


// disabled={!this.validateForm()}