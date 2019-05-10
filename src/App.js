import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './App.css';

import Categories from './components/Categories/Categories';
import NavHeader from './components/NavHeader/NavHeader';
import CategoryExpanded from './components/CategoryExpanded/CategoryExpanded';
import UploadEntry from './components/UploadEntry/UploadEntry';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends Component {

  render(){
      return(
        <BrowserRouter>
          <React.Fragment>
              <Route path='/' component={NavHeader}></Route>
              <Route exact path='/' component={Categories}></Route>
              <Route path='/profile'></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/category/:categoryNumber' component={CategoryExpanded}></Route>
              <Route path='/upload' component={UploadEntry}></Route>
              <Route path='/new/:categoryNumber' component={UploadEntry}></Route>
          </React.Fragment>
        </BrowserRouter>
      )
    }
  }

export default App;