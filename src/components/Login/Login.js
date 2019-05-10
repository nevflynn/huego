import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import modalHeader from '../../img/modal-style-2.png';
import styles from '../Login/Login.module.css';

class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          loginStatus:false,
          displayError: false,
          errorMessage: ''
        };
      }

    validateForm() {
        let validationStatus = false;
        let errorMessage = '';

        if(!this.state.username.length > 0 && !this.state.password.length > 0){
            validationStatus = false;
            errorMessage = 'Whoops! Please enter your username and password.';
        } else if(!this.state.username.length > 0){
            validationStatus = false;
            errorMessage = 'You entered a password but not a username.';
        } else if (!this.state.password.length > 0){
            validationStatus = false;
            errorMessage = 'Looks like you forgot your password there, ' + this.state.username + '.';
        } else {
            validationStatus = true;
        }

        this.setState({errorMessage: errorMessage, displayError: !validationStatus});
        return validationStatus;
    }

    handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.validateForm()){
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
            let errorObject = error.response.data;
            let errorMessage = errorObject[Object.keys(errorObject)[0]];
            this.setState({displayError:true, errorMessage: errorMessage});
          });
        } 
    }

    render(){

        if (this.state.loginStatus){
            return <Redirect to='/'></Redirect>
        } 
        
        return(
            <div className={styles.login}>
                <div className={styles.loginModal}>
                    <img src={modalHeader} className={styles.modalHeader}></img>
                    <div className={styles.loginModalInner}>
                        <div className={styles.errorMessage} style={ { display: this.state.displayError ? 'flex' : 'none' } }>{this.state.errorMessage}</div>
                        <form onSubmit={this.handleSubmit}>
                            <input className={styles.input} placeholder="Username" onChange={this.handleChange} value={this.state.email} id="username" autoFocus></input>
                            <input className={styles.input} type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} id="password"></input>
                            <button className={styles.loginButton} type="submit" >Login</button>
                        </form>
                        <div className={styles.forgotPassword}>
                            <a href="#" >Having trouble logging in?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;


// disabled={!this.validateForm()}