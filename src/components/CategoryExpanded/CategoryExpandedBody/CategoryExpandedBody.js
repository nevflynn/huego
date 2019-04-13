import React, { Component } from 'react';

import Entry from '../../Categories/CategoryRow/Entry/Entry';
import styles from '../CategoryExpandedBody/CategoryExpandedBody.module.css'

class CategoryExpandedBody extends Component {


    constructor(props) {
        super(props);
        this.state = {
          entries: [],
          isLoaded: false, 
        }
      }

    componentDidMount(props){
        let url = 'http://localhost:5000/api/posts/post_category/' + this.props.categoryNumber;
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded:true,
                entries: json
            })
        });
    }

    render(){

        return (
            <div className={styles.CategoryExpandedBody}>
            {this.state.entries.map((entry, i) => {
                return <Entry
                cardStyle={true}
                postUser={entry.post_username} 
                postLikes={entry.post_likes} 
                postImage={entry.post_image} 
                position={i + 1} 
                id={entry._id} 
                key={entry._id + 1}></Entry>
              })
            }
       </div>
        )
    }
}

export default CategoryExpandedBody;