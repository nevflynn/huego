import React, {Component} from 'react';

import '../../App.css';
import CategoryRow from './CategoryRow/CategoryRow';


class Categories extends Component{

    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          isLoaded: false,
          categoryFilter:this.props.categoryFilter
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
                            {categories.map((category) => { 
                                return <CategoryRow 
                                    className="CategoryRow" 
                                    postCategory={category.post_category}
                                    postHexCodes={category.post_hex_codes}
                                    postExpiry={category.post_expiry}
                                    key={category._id}>
                                </CategoryRow>
                            })}
                        </div>
                    </div>
                }
            }
        }

export default Categories;