import React, { Component } from 'react';
import axios from 'axios';

import '../../../../App.css';
import styles from './Entry.module.css';
import likeIcon from '../../../../img/like-icon.svg';

class Entry extends Component {

    constructor(props){
        super(props);
        this.state = {
            postLikes: this.props.postLikes,
            likeButtonClicked: false,
        }
    }

    //Check if the id exists in local storage, if it does, change the likeButtonClicked state to true
    componentWillMount() {
        localStorage.getItem(this.props.id) && this.setState({
            likeButtonClicked: true
        })
    }
    
        
    likeButtonClicked(props){

        if (!this.state.likeButtonClicked){
            this.setState({postLikes: this.state.postLikes + 1});

            //Saving the entry id to local storage if the button is clicked && state = False
            localStorage.setItem((this.props.id), true);

            axios.post('http://localhost:5000/api/posts/update/' + this.props.id, {
                post_likes: this.state.postLikes + 1,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({likeButtonClicked: true});
        } else {

            this.setState({postLikes: this.state.postLikes - 1});
            localStorage.removeItem(this.props.id);
            axios.post('http://localhost:5000/api/posts/update/' + this.props.id, {
                post_likes: this.state.postLikes - 1,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({likeButtonClicked: false});
        }
    }

    render(){

        let cardBadge, placeText;

        if(this.props.cardStyle){
            var singleCard = styles.singleCard;
        } else {
            singleCard = null;
        }

        if (this.props.position === 1){
            cardBadge = styles.badge + ' ' + styles.firstBadge;
            placeText = '1st Place';
            var firstEntry = styles.firstEntry;
        } else if (this.props.position === 2){
            cardBadge = styles.badge + ' ' + styles.secondBadge;
            placeText = '2nd Place';
        } else if (this.props.position === 3){
            cardBadge = styles.badge + ' ' + styles.thirdBadge;
            placeText = '3rd Place';
        } else {

        }

        return (

            <div className={"card " + firstEntry + " " + singleCard}>
            <div className="cardImageContainer">
                <img className="cardImage" src={this.props.postImage}></img>
            </div>
                <div className="cardInfo">
                    <div className="cardInfoLeft">
                        <div className={"cardButtonSecondary " + styles.likeButton + ' ' + (this.state.likeButtonClicked ? styles.active : '')} 
                        onClick={() => {this.likeButtonClicked()}}>
                            <img src={likeIcon} className={styles.likeButtonIcon}></img>
                            <h5>{this.state.postLikes}</h5>
                        </div>
                        <div className="cardButtonSecondary">
                            <h5>{this.props.postUser}</h5>
                        </div>
                    </div>
                    <div className={cardBadge}>
                        <h5>{placeText}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entry;


