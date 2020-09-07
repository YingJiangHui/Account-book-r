import React, {FC} from 'react';
import styled from 'styled-components';

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
}
const Cover:FC<Props> =({className,children,onChange})=>{
  return(
    <Wrapper className={className} onClick={onChange}>
      {children}
    </Wrapper>
  )
}

export default Cover