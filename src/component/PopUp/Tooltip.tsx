import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import React, {FC, memo, useEffect, useState} from 'react';
import Icon from '../Icon';
import 'style/animation.scss'

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: rgba(0,0,0,0.66);
  color: #fff;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  display: flex;justify-content: center;align-items: center;
  flex-direction: column;
  z-index: 99;
  .icon{
    fill:#fff;
    width: 34px;
    height: 34px;
    margin-bottom: 5px;
  }
`;
type Props = {
  inProp: boolean
  value: string
}
const Tooltip: FC<Props> =memo( ({value, inProp}) => {
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    setVisible(inProp)
    setTimeout(()=>setVisible(false),3000)
  },[inProp])
  return (
    <div>
    <CSSTransition unmountOnExit={true} classNames={'fade'}  in={visible} timeout={200}>
        <Wrapper >
          <Icon name='true2'/>
          {value}
        </Wrapper>
    </CSSTransition>
    </div>
  );
});
export default Tooltip;