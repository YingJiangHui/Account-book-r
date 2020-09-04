import React, {FC} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  z-index: 8;
`;

type Props={
  className?:string
}
const Cover:FC<Props> =(props)=>{
  return(
    <Wrapper className={props.className}>

    </Wrapper>
  )
}

export default Cover