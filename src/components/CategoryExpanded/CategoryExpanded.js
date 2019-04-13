import React, { Component } from 'react';

import CategoryExpandedHeader from '../CategoryExpanded/CategoryExpandedHeader/CategoryExpandedHeader';
import CategoryExpandedBody from '../CategoryExpanded/CategoryExpandedBody/CategoryExpandedBody';

class CategoryExpanded extends Component {
    render(){
        var categoryNumber = this.props.match.params.categoryNumber;
        
        return ( 
        <div>
            <CategoryExpandedHeader categoryNumber={categoryNumber}></CategoryExpandedHeader>
            <CategoryExpandedBody categoryNumber={categoryNumber}></CategoryExpandedBody>
        </div>
        )
    }
}

export default CategoryExpanded;