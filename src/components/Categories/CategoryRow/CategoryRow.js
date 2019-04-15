import React, { Component } from 'react';

import '../../../App.css'
import CategoryHeader from './CategoryHeader/CategoryHeader';

import Entry from './Entry/Entry';
import EntryGrid from './EntryGrid/EntryGrid';
import styles from '../CategoryRow/CategoryRow.module.css'


class CategoryRow extends Component {


  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      isLoaded: false, 
      width: 0,
      height: 0,
      entriesToRender: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

    componentDidMount(props){
        let url = 'http://localhost:5000/api/posts/post_category/' + this.props.postCategory + '/popular';
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
              isLoaded:true,
              entries: json
            })
        });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

    checkEntriesToRender(){

        if (this.state.width > 1800){
          return 4;
        } else if (this.state.width > 1500 && this.state.width < 1800) {
          return 3;
        } else if (this.state.width > 1200 && this.state.width < 1500){
          return 2;
        } else if (this.state.width > 1000 && this.state.width < 1200){
          return 1;
      }
    }


    render(){

        var {isLoaded, entries} = this.state;
        var mainEntries = entries.slice(0, this.checkEntriesToRender());
        var nextFourEntries = entries.slice(this.checkEntriesToRender(), );

        if (this.state.entries.length > this.checkEntriesToRender()){
          var entryGrid = <EntryGrid lastFour={nextFourEntries} postCategory={this.props.postCategory}></EntryGrid>;
        }


        if (!isLoaded) {
            return <div></div>
          } else {
            return(
              <div className={styles.CategoryRow}>
                  <CategoryHeader numberOfEntries={Object.keys(this.state.entries).length} postHexCodes={this.props.postHexCodes} postExpiry={this.props.postExpiry}></CategoryHeader>
                  <div className="entryRow">
                      {mainEntries.map((entry, i) => {
                          return <Entry 
                          postUser={entry.post_username} 
                          postLikes={entry.post_likes} 
                          postImage={entry.post_image} 
                          position={i + 1} 
                          id={entry._id} 
                          key={entry._id + 1}></Entry>
                        })
                      }
                      {entryGrid}
                 </div>
              </div>
            )
        }
    }   
}

export default CategoryRow;