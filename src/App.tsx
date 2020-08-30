import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import 'reset.scss';

/*Views*/
import Setting from 'views/Setting';
import Statistics from 'views/Statistics';
import Detail from 'views/Detail';
import NoMatch from './views/NotFound';



export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail">
          <Detail/>
        </Route>
        <Route path="/statistics">
          <Statistics/>
        </Route>
        <Route path="/setting">
          <Setting/>
        </Route>
        <Redirect exact from="/" to="/statistics"/>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
  );
}


