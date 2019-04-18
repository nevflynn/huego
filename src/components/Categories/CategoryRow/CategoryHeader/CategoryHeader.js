import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import '../../../../App.css';
import styles from './CategoryHeader.module.css';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

render(){

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
                        <div style={color_1}></div>
                        <div style={color_2}></div>
                        <div style={color_3}></div>
                        <div style={color_4}></div>
                    </div>
                </div>
                <div className="cardInfo">
                <div className="cardInfoLeft">
                    <div className="cardButtonSecondary">
                        <h5>
                            {this.categoryStatus()}
                        </h5>
                    </div>
                    <div className="cardButtonSecondary">
                        <h5>{this.props.numberOfEntries} Entries</h5>
                    </div>
                </div>
                <Link  to={'/new/' + this.props.postCategory}>
                    <div className={"cardButtonPrimary " + hideSubmit}>
                        <h5>Submit Entry</h5>
                    </div>
                </Link>
                </div>
            </div>
        );
    }
}

export default Category;



