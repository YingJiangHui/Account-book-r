import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import 'reset.scss';
import Routes from 'component/Routes'
/*Views*/
const scrollTop = document.body.scrollTop+document.documentElement.scrollTop;
setTimeout(()=>{
    window.scrollTo(0,100000)
    console.log(scrollTop);
  }
  ,2000)
export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}


