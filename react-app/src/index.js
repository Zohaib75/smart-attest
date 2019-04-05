import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import Landing from './layouts/Landing'
import Check from './layouts/Check'

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
    <Route path='/home' component={Landing} />
    <Route path='/check' component={Check} />
    
    <Route path='/auth' component={() => { window.location = 'http://localhost:3001/auth/google'; return null;} }/>

      {indexRoutes.map((prop, key) => {
       
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
