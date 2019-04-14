import React, { Component } from 'react';
import Moment from 'react-moment';


import styles from '../CategoryExpandedHeader/CategoryExpandedHeader.module.css';

class CategoryExpandedHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
          postHeaders: [],
          isLoaded: false,
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
              return <Moment toNow ago>{this.state.postHeaders[0].post_expiry}</Moment>;
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
                        <div className="cardButtonSecondary large"><h5>{postCount} entries</h5></div>
                    </div>
                    <div>
                        <div className={"cardButtonPrimary large " + (this.checkExpiry() ? null : styles.hide)}><h5>Submit an entry</h5></div>
                    </div>
                </div>
                )
            } else {
                return null;
            }
        }
    }


export default CategoryExpandedHeader;