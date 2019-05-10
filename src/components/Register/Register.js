import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import registerIcon from '../../img/login-icon.svg';
import styles from '../Register/Register.module.css';

class Register extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          firstName: '',
          lastName: '',
          username:'',
          email:'',
          password1:'',
          password2:'',
          registerStatus:false,
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
        axios.post('http://localhost:5000/api/users/register', {
            name: this.state.firstName + ' ' + this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password1,
            password2: this.state.password2,
            is_admin: 'false'
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setState({registerStatus:true});
          })
          .catch((error) => {
            console.log(error);
            this.setState({displayError:true});
          });
        
    }

    render(){

        if (this.state.registerStatus){
            return <Redirect to='/'></Redirect>
        } 
        
        return(
            <div className={styles.register}>
                <div className={styles.registerModal}>
                    <form onSubmit={this.handleSubmit}>
                    <div className={styles.formGroup}>
                        <div>
                            <input className={styles.input} placeholder="First name" onChange={this.handleChange} value={this.state.firstName} id="firstName" autoFocus></input>
                        </div>
                        <div>
                            <input className={styles.input} placeholder="Last name" onChange={this.handleChange} value={this.state.lastName} id="lastName"></input>
                        </div>
                    </div>
                        <input className={styles.input} type="text" placeholder="Username" onChange={this.handleChange} value={this.state.username} id="username"></input>
                        <input className={styles.input} type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} id="email"></input>
                        <input className={styles.input} type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password1} id="password1"></input>
                        <input className={styles.input} type="password" placeholder="Confirm password" onChange={this.handleChange} value={this.state.password2} id="password2"></input>
                        <button className={styles.registerButton} type="submit">Register</button>
                    </form>
                    <a href="#" className={styles.forgotPassword}>Already have an account? Log in</a>
                </div>
            </div>
        )
    }
}

export default Register;


