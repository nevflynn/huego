import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import modalHeader from '../../img/thin-modal-style-1.png';
import styles from '../Register/Register.module.css';
import checkMark from '../../img/check-mark.svg';
import reject from '../../img/reject.svg';

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
          displayError: false,
          errorMessage:'',
          usernameAvailable: null,
          showSpinner:false
        };
      }

    validateForm() {
        let validationStatus = false;
        let errorMessage = '';

        if(!this.state.username.length > 0 || 
            !this.state.firstName.length > 0 ||
            !this.state.lastName.length > 0 ||
            !this.state.email.length > 0 ||
            !this.state.password1.length > 0 ||
            !this.state.password2.length > 0 ){
            validationStatus = false;
            errorMessage = 'Looks like you missed some fields.';
        } else if(this.state.password1.length < 8){
            validationStatus = false;
            errorMessage = 'Your password should be at least 8 characters.';
        } else if(!this.state.usernameAvailable){
            validationStatus = false;
            errorMessage = 'That username already exists';
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
    if(event.target.id == 'username' && event.target.value.length > 0){
        let usernameInput = event.target.value;
        console.log(event.target.value);
        axios.post('http://localhost:5000/api/users/usernameCheck', {
            username: usernameInput,
          })
          .then((response) => {
            this.setState({usernameAvailable: true, showSpinner: false})
          })
          .catch((error) => {
            this.setState({usernameAvailable: false, showSpinner: false})

          });
          this.setState({showSpinner:true});
    };
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.validateForm()){
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
            let errorObject = error.response.data;
            let errorMessage = errorObject[Object.keys(errorObject)[0]];
            this.setState({displayError:true, errorMessage: errorMessage});
          }); 
        }       
    }

    render(){

        let availabilityIcon;
        if(this.state.usernameAvailable){
            availabilityIcon = <img src={checkMark}></img>
        } else if (!this.state.usernameAvailable){
            availabilityIcon = <img src={reject}></img>                           
        }

        if(this.state.showSpinner){
            var spinner =   <div className={styles.spinnerWrapper}>
                                <div className={styles.spinner}><div></div><div></div><div></div><div></div></div>
                            </div>
        }

        if (this.state.registerStatus){
            return <Redirect to='/'></Redirect>
        } 
        
        return(
            <div className={styles.register}>
                <div className={styles.registerModal}>
                    <img src={modalHeader} className={styles.modalHeader}></img>
                    <div className={styles.registerModalInner}>
                    <div className={styles.errorMessage} style={ { display: this.state.displayError ? 'flex' : 'none' } }>{this.state.errorMessage}</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={styles.usernameWrapper}>
                                <input className={styles.input} type="text" placeholder="Username" onChange={this.handleChange} value={this.state.username} id="username" autoFocus></input>
                                <div className={styles.checkMarkWrapper} style={ { display: this.state.showSpinner || this.state.username == '' ? 'none' : 'block' }}>
                                        {availabilityIcon}
                                </div>
                                {spinner}
                            </div>
                            <div className={styles.formGroup}>
                            <div>
                                <input className={styles.input} placeholder="First name" onChange={this.handleChange} value={this.state.firstName} id="firstName"></input>
                            </div>
                            <div>
                                <input className={styles.input} placeholder="Last name" onChange={this.handleChange} value={this.state.lastName} id="lastName"></input>
                            </div>
                        </div>
                            <input className={styles.input} type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} id="email"></input>
                            <input className={styles.input} type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password1} id="password1"></input>
                            <input className={styles.input} type="password" placeholder="Confirm password" onChange={this.handleChange} value={this.state.password2} id="password2"></input>
                            <button className={styles.registerButton} type="submit">Register</button>
                        </form>
                        <div className={styles.logIn}>
                            <a href="#">Already have an account? Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;