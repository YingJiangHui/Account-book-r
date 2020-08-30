import React, {FC} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  &.moveTo{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;left: 0;
    background: rgba(0,0,0,.05);
  }
`

type Props={
  className:string
}
const Cover:FC<Props> =(props)=>{
  return(
    <Wrapper className={props.className}>
      {props.children}
    </Wrapper>
  )
}

export default Cover