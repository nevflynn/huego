import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CategoryOrderToggle from './CategoryOrderToggle/CategoryOrderToggle';
import entriesIcon from '../../../img/entries-icon.svg';
import styles from '../CategoryExpandedHeader/CategoryExpandedHeader.module.css';

class CategoryExpandedHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
          postHeaders: [],
          isLoaded: false,
          postCount: ''
        }
      }

    componentDidMount(props){
        let url = 'http://localhost:5000/api/posts/post_headers/' + this.props.categoryNumber;
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                postHeaders: json,
                isLoaded: true,
            })
        });
        let url2 = 'http://localhost:5000/api/posts/post_count/' + this.props.categoryNumber;
        fetch(url2)
        .then(res => res.json())
        .then(json => {
            this.setState({
                postCount:json
            })
        });
    }

    checkExpiry(){
        var dateNow = Date.now();
        var expiryDate = new Date(this.state.postHeaders[0].post_expiry);
        var timeDifference = expiryDate - dateNow;
        if (timeDifference > 0) {
            return true;
        } else {
            return false;
        }
      }

      categoryStatus(){
          if(this.checkExpiry()){
              return <span><Moment toNow ago>{this.state.postHeaders[0].post_expiry}</Moment> remaining</span>;
          } else {
              return 'Closed';
          }
      }

    render(){

        var color_1, color_2, color_3, color_4;

        if (this.state.isLoaded){
            var postHexCodes = this.state.postHeaders[0].post_hex_codes;
            var postCount = this.state.postHeaders[0].post_count;

            color_1 = {
                backgroundColor: postHexCodes[0],
            };
            color_2 = {
                backgroundColor: postHexCodes[1],
            };
            color_3 = {
                backgroundColor: postHexCodes[2],
            };
            color_4 = {
                backgroundColor: postHexCodes[3],
            };

            return (
                <div className={styles.categoryExpandedHeader}>
                    <div className={styles.leftContainer}>
                        <div className={styles.paletteOuter}>
                            <div style={color_1}></div>
                            <div style={color_2}></div>
                            <div style={color_3}></div>
                            <div style={color_4}></div>
                        </div>
                        <div className="cardButtonSecondary large"><h5>{this.categoryStatus()}</h5></div>
                        <div className={styles.entriesContainer}>
                            <img src={entriesIcon} className={styles.entriesIcon}></img>
                            <h5>{this.state.postCount} Entries</h5>
                        </div>

                    </div>
                    <div className={styles.rightContainer}>
                        <CategoryOrderToggle filterCategories={this.props.filterCategories}></CategoryOrderToggle>
                        <Link  to={'/new/' + this.props.categoryNumber}>
                            <div className={"cardButtonPrimary large " + (this.checkExpiry() ? null : styles.hide)}><h5>Submit an entry</h5></div>
                        </Link>
                    </div>
                </div>
                )
            } else {
                return null;
            }
        }
    }


export default CategoryExpandedHeader;

