import React, { Component } from 'react';
// 22. we deleted a few more things like the css file
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import IdeaBoard from './components/IdeaBoard';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        {/* 23. Then we changed the content in here to be Router and Switch and stuff  */}
        <Router>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/users/:userId' component={ IdeaBoard } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;