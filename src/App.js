import React, { Component, Suspense } from 'react';

import './App.css';

import CategoryRow from './components/CategoryRow/CategoryRow';
import NavHeader from './components/NavHeader/NavHeader';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false, 
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/posts/post_headers')
      .then(res => res.json())
      .then(json => {
          this.setState({
            isLoaded:true,
            items: json
          })
      });
  }

  render(){
    //Same as saying var isLoaded = this.state.isLoaded;
    var {isLoaded, items} = this.state;

    if (!isLoaded) {
      return <div></div>
    } else {
      return(
        <React.Fragment>
            <NavHeader></NavHeader>
            <div className="App">
              <div>
                  {items.map((item) => { 
                        return <CategoryRow 
                          className="CategoryRow" 
                          postCategory={item.post_category}
                          postHexCodes={item.post_hex_codes}
                          postExpiry={item.post_expiry}
                          key={item._id}>
                      </CategoryRow>
                  })}
              </div>
            </div>
        </React.Fragment>
      )
    }
  }
}

export default App;