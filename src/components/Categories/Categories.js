import React, {Component} from 'react';

import '../../App.css';
import CategoryRow from './CategoryRow/CategoryRow';
// import LoginPrompt from './../LoginPrompt/LoginPrompt';
import LazyLoad from 'react-lazyload';
import styles from './Categories.module.css'
import LoginPrompt from '../LoginPrompt/LoginPrompt';

class Categories extends Component{

    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          isLoaded: false,
          categoryFilter:this.props.categoryFilter,
          loginStatus: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/posts/post_headers/new')
          .then(res => res.json())
          .then(json => {
              this.setState({
                isLoaded:true,
                categories: json
              })
          });
    }

        render(){
        var {isLoaded, categories} = this.state;

        if (!isLoaded) {
            return null;
        } else {
            return  <div className="Home">
                        <div>
                            {categories.map((category, i) => { 
                                return (
                                <LazyLoad height={300} key={i}>
                                    <CategoryRow 
                                        className="CategoryRow" 
                                        postCategory={category.post_category}
                                        postHexCodes={category.post_hex_codes}
                                        postExpiry={category.post_expiry}
                                        key={category._id}
                                        index={i}>
                                    </CategoryRow>
                                </LazyLoad>
                            )})}
                        </div>
                        {this.state.loginStatus ? <LoginPrompt></LoginPrompt> : null}
                    </div>
                }
            }
        }

export default Categories;
