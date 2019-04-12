import React, { Component, Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom'

import './App.css';

import CategoryRow from './components/CategoryRow/CategoryRow';
import NavHeader from './components/NavHeader/NavHeader';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoaded: false, 
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/posts/post_headers')
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded:true,
            categories: json
          })
      });
  }

  render(){
    //Same as saying var isLoaded = this.state.isLoaded;
    var {isLoaded, categories} = this.state;

    if (!isLoaded) {
      return <div></div>
    } else {
      return(
        <BrowserRouter>
          <React.Fragment>
              <NavHeader></NavHeader>
              <div className="Home">
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
          </React.Fragment>
        </BrowserRouter>
      )
    }
  }
}

export default App;