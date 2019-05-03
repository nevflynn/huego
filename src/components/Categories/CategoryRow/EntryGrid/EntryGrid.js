import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import '../../../../../src/App.css';
import styles from './EntryGrid.module.css';

class EntryGrid extends Component {
    render(){

        return (
            <div className={'card ' + styles.EntryGridCard}>
                <div className="cardImageContainer">
                    <div className={styles.EntryGrid}>
                        {this.props.lastFour.map((entry) => {
                            return  <div key={entry._id}>
                                        <img className="cardImage" src={entry.post_image}></img>
                                    </div>
                            })
                        }
                    </div>
                </div>
                <div className="cardInfo cardInfoGrid">
                    <div className="expandCategoryButton">
                        <Link to={'/category/' + this.props.postCategory}><h5>View all</h5></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default EntryGrid;