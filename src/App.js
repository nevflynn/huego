import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './App.css';

import Categories from './components/Categories/Categories';
import NavHeader from './components/NavHeader/NavHeader';
import CategoryExpanded from './components/CategoryExpanded/CategoryExpanded';

class App extends Component {

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
      return(
        <BrowserRouter>
          <React.Fragment>
              <Route path='/' render={(props) => <NavHeader filterCategories={this.filterCategories}></NavHeader>}></Route>
              <Route exact path='/' render={(props) => <Categories categoryFilter={this.state.categoryFilter}></Categories>}></Route>
              <Route path='/profile'></Route>
              <Route path='/category/:categoryNumber' component={CategoryExpanded}></Route>
          </React.Fragment>
        </BrowserRouter>
      )
    }
  }

export default App;