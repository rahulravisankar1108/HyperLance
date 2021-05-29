import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
 
function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
