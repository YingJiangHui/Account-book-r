import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import 'reset.scss';

/*Views*/
import Setting from 'views/Setting';
import Statistics from 'views/Statistics';
import Detail from 'views/Detail';
import NotFound from './views/NotFound';
import RecordItem from 'views/RecordItem'


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/detail">
          <Detail/>
        </Route>
        <Route exact path="/detail/record/:id">
          <RecordItem/>
        </Route>
        <Route exact path="/statistics">
          <Statistics/>
        </Route>
        <Route exact path="/setting">
          <Setting/>
        </Route>
        <Redirect exact from="/" to="/statistics"/>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}


