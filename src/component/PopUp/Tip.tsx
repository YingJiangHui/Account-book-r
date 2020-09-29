import {FC, memo, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import React from 'react';
type Props = {
  inProp: boolean
  onChange:(value:boolean)=>void
}

const Tip: FC<Props> =memo( ({inProp,onChange,children}) => {
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    setVisible(inProp)
    let timer:number;
    if(inProp)
      timer = setTimeout(()=>{onChange(false)},3000)
    return ()=>{
      clearTimeout(timer)
    }
  },[inProp])
  return (
    <div>
      <CSSTransition unmountOnExit={true} classNames={'fade'} className={'fade'}  in={visible} timeout={250}>
        {children}
      </CSSTransition>
    </div>
  );
});
export default Tip;