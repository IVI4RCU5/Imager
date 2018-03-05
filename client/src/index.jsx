import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import Image from './components/Image.jsx';
import Submit from './components/Submit.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/images/:imageId" component={Image}/>
          <Route path="/submit" component={Submit}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));