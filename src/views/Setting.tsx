import React, {useState} from 'react';
import Layout from '../component/Layout';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import 'style/animation.scss'
function Setting() {
  const [state, setState] = useState(false);
  return (
    <SwitchTransition >
      <CSSTransition

        key={state ? "Goodbye, world!" : "Hello, world!"}
        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
        classNames='xxx'
      >
        <button onClick={() => setState(state => !state)}>
          {state ? "Goodbye, world!" : "Hello, world!"}
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default Setting;