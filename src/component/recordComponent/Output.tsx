import styled from 'styled-components';
import {FC} from 'react';
import React from 'react';

const Wrapper = styled.section`
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    span{
    font-size: 24px;
    font-weight: bold;
      margin-right: 10px;
      font-weight: bold;
    }
    .output{
      font-weight: bold;
      font-size: 36px;
    }
`;
const Output:FC=()=>{
  return(
    <Wrapper>
      <span>￥</span>
      <div className='output'>12312</div>
    </Wrapper>
  )
}
export default Output