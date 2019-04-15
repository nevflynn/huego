import React, { Component } from 'react';

import CategoryExpandedHeader from '../CategoryExpanded/CategoryExpandedHeader/CategoryExpandedHeader';
import CategoryExpandedBody from '../CategoryExpanded/CategoryExpandedBody/CategoryExpandedBody';

class CategoryExpanded extends Component {

    constructor(props) {
        super(props);
        this.filterCategories = this.filterCategories.bind(this);
        this.state = {
          categoryFilter: true,
        }
    }

    filterCategories(){
        this.setState({categoryFilter: !this.state.categoryFilter});
    }

    render(){
        var categoryNumber = this.props.match.params.categoryNumber;
        
        return ( 
        <div>
            <CategoryExpandedHeader categoryNumber={categoryNumber} filterCategories={this.filterCategories}></CategoryExpandedHeader>
            <CategoryExpandedBody categoryNumber={categoryNumber} categoryFilter={this.state.categoryFilter}></CategoryExpandedBody>
        </div>
        )
    }
}

export default CategoryExpanded;