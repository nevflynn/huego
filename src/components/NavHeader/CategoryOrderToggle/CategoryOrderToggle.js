import React, { Component } from 'react';

import styles from '../CategoryOrderToggle/CategoryOrderToggle.module.css';

class CategoryOrderToggle extends Component {
    render(){
        return  (
            <div className={styles.toggleWrapper}>
                <h5>New</h5>
                    <div>
                        <input type="checkbox" className={styles.toggleSwitch}></input>
                    </div>
                <h5>Popular</h5>
            </div>
        )
    }
}

export default CategoryOrderToggle;