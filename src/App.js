import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './App.css';

import Categories from './components/Categories/Categories';
import NavHeader from './components/Categories/NavHeader/NavHeader';

class App extends Component {

  render(){
      return(
        <BrowserRouter>
          <React.Fragment>
              <NavHeader></NavHeader>
              <Route exact path='/' component={Categories}></Route>
              <Route path='/profile'></Route>
          </React.Fragment>
        </BrowserRouter>
      )
    }
  }

export default App;