import React, { Component } from 'react';

import styles from '../CategoryExpandedHeader/CategoryExpandedHeader.module.css';

class CategoryExpandedHeader extends Component {
    render(){
        return (
        <div className={styles.categoryExpandedHeader}>
            <div className={styles.leftContainer}>
                <div className={styles.paletteOuter}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="cardButtonSecondary large"><h5>This is category {this.props.categoryNumber}</h5></div>
                <div className="cardButtonSecondary large"><h5>Number 3</h5></div>
                <div className="cardButtonSecondary large"><h5>Number 4</h5></div>
            </div>
            <div>
                <div className="cardButtonPrimary large"><h5>Submit an entry</h5></div>
            </div>
        </div>
        )
    }
}

export default CategoryExpandedHeader;