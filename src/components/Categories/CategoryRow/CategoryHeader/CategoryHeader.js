import React, { Component } from 'react';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import entriesIcon from '../../../../img/entries-icon.svg';
import LoginPrompt from '../../../LoginPrompt/LoginPrompt'
import '../../../../App.css';
import styles from './CategoryHeader.module.css';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect:false,
        }
      }

      checkExpiry(){
        var dateNow = Date.now();
        var expiryDate = new Date(this.props.postExpiry);
        var timeDifference = expiryDate - dateNow;
        if (timeDifference > 0) {
            return true;
        } else {
            return false;
        }
      }

      categoryStatus(){
          if(this.checkExpiry()){
              return <Moment toNow ago>{this.props.postExpiry}</Moment>;
          } else {
              return 'Closed';
          }
      }

      loginStatus(){
        if (localStorage.getItem("token") !== null) {
            console.log('you have a key');
            this.setState({redirect:true})
          } else {
            console.log('no keys here!');
             this.props.loginHandler();
          }
      }


render(){

        if(this.state.redirect){
            return <Redirect to={'/new/' + this.props.postCategory}></Redirect>
        } 

        var hideSubmit;

        if (!this.checkExpiry()){
            hideSubmit = styles.hideSubmit;
        } else {
            hideSubmit = '';
        }

        const color_1 = {
            backgroundColor: this.props.postHexCodes[0],
            };
        const color_2 = {
            backgroundColor: this.props.postHexCodes[1],
            };
        const color_3 = {
            backgroundColor: this.props.postHexCodes[2],
            };
        const color_4 = {
            backgroundColor: this.props.postHexCodes[3],
            };

        return (

            <div className={'card ' + styles.CategoryCard}>
                <div className="cardImageContainer">
                    <div className={styles.paletteInner}>
                        <div className={styles.paletteBlock} style={color_1}>
                            <div className={styles.paletteHex}>{this.props.postHexCodes[0]}</div>
                        </div>
                        <div className={styles.paletteBlock} style={color_2}>
                            <div className={styles.paletteHex}>{this.props.postHexCodes[1]}</div>
                        </div>
                        <div className={styles.paletteBlock} style={color_3}>
                            <div className={styles.paletteHex}>{this.props.postHexCodes[2]}</div>
                        </div>
                        <div className={styles.paletteBlock} style={color_4}>
                            <div className={styles.paletteHex}>{this.props.postHexCodes[3]}</div>
                        </div>

                    </div>
                </div>
                <div className="cardInfo">
                <div className="cardInfoLeft">
                    <div className="cardButtonSecondary">
                        <h5>
                            {this.categoryStatus()} 
                        </h5>
                    </div>
                    <div className={styles.entriesContainer}>
                        <img src={entriesIcon} className={styles.entriesIcon}></img>
                        <h5>{this.props.numberOfEntries}</h5>
                    </div>
                </div>
                {/* testing here  */}
                    <div className={"cardButtonPrimary " + hideSubmit} onClick={() => this.loginStatus()}>
                        <h5>Submit Entry</h5>
                    </div>
                {/* testing here */}
                </div>
            </div>
        );
    }
}

export default Category;



{/* <Link  to={'/new/' + this.props.postCategory}>
<div className={"cardButtonPrimary " + hideSubmit}>
    <h5>Submit Entry</h5>
</div>
</Link> */}