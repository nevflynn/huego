import React, { Component } from 'react';

import Entry from '../../Categories/CategoryRow/Entry/Entry';
import styles from '../CategoryExpandedBody/CategoryExpandedBody.module.css';

class CategoryExpandedBody extends Component {


    constructor(props) {
        super(props);
        this.state = {
          entries: [],
          isLoaded: false, 
          categoryFilter:this.props.categoryFilter
        }
      }

    componentDidMount(props){
        let url = 'http://localhost:5000/api/posts/post_category/' + this.props.categoryNumber + (!this.state.categoryFilter ? '/new' : '/popular');
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded:true,
                entries: json
            })
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.categoryFilter !== this.props.categoryFilter){
        fetch('http://localhost:5000/api/posts/post_category/' + this.props.categoryNumber + (!this.state.categoryFilter ? '/popular' : '/new'))
          .then(res => res.json())
          .then(json => {
              this.setState({
                isLoaded:true,
                entries: json,
                categoryFilter: !this.state.categoryFilter
              })
          });
        }
    }   

    orderEntries(json){
      var entries = json;
      var newArray = [{}];
      entries.forEach((entry, i) => {
        var postId = entry._id;
        var postLikes = entry.post_likes;
        newArray.push({postId, postLikes});
      })
      newArray.sort(function(a, b){
        return b.postLikes-a.postLikes
    })
      return [newArray[1], newArray[2], newArray[3]];
    }

    render(){   

        return (
            <div className={styles.CategoryExpandedBody}>
            {this.state.entries.map((entry, i) => {
                return (
                  <Entry
                  placement={this.orderEntries(this.state.entries)}
                  cardStyle={true}
                  postUser={entry.post_username} 
                  postLikes={entry.post_likes} 
                  postImage={entry.post_image} 
                  key={i} 
                  id={entry._id} 
                  >
                  </Entry>
            )})
            }
          </div>
        )
    }
}

export default CategoryExpandedBody;