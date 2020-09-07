import styled from 'styled-components';
import React, {FC} from 'react';
const Wrapper = styled.div`
  color: #7e7e7e;
  text-align: center;
  padding: 10px;
  margin: 36px;
  font-size: 18px;
`
type Props={
  text:string
}
const NotData:FC<Props> = ({text})=>{
  return(
    <Wrapper>
      {text}
  </Wrapper>)
}

export default NotData