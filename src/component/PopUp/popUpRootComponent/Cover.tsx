import React, {FC} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  z-index: 8;
`;

type Props={
  className?:string
}
const Cover:FC<Props> =({className,children})=>{
  return(
    <Wrapper className={className}>
      {children}
    </Wrapper>
  )
}

export default Cover