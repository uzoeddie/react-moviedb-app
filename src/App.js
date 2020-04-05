import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import store from './redux/store';
import Header from './components/header/Header';

// api - 5777c7d7f8c6e8682e7818d61ad21e3a

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/:id/:name/details' component={Details} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
