import React, {FC} from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import 'style/animation.scss';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100%;
  z-index: 8;
`;

type Props={
  className?:string
  onChange?:()=>void
  show?:boolean
}
const Cover:FC<Props> =({className,children,onChange,show})=>{
  return(
    <CSSTransition classNames='fade' className='popUp' timeout={250} unmountOnExit={true} in={show}>
    <Wrapper className={className} onClick={onChange}>
      {children}
    </Wrapper>
    </CSSTransition>

  )
}

export default Cover