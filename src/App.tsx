import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import 'reset.scss';
import Routes from 'component/common/Routes'


export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}


