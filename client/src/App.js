import React, { Component } from 'react';
// 22. we deleted a few more things like the css file
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import IdeaBoard from './components/IdeaBoard';

class App extends Component {
  render() {
    return (
      <div>
        {/* 23. Then we changed the content in here to be Router and Switch and stuff */}
        <Router>
          <Switch>
            <Route exact path='/' component={IdeaBoard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
