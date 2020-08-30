import styled from 'styled-components';
import {FC} from 'react';
import React from 'react';

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  >ol{
    >li{
      background:#f1f1f1;
      color: #a9a9a9;
      font-size: 14px;
      font-weight: 100;
      border-radius: 25px;
      display: inline-block;
      padding: 5px 10px;
      margin-right:10px ;
    }
  }
  input[type=date]{
      font-size: 14px;
      border: none;
      border-radius: 25px;
      background:#f1f1f1;
  }
`;


const SelectInfo:FC=()=>{
  return(
    <Wrapper>
      <ol>
        <li>支出</li>
        <li>收入</li>
      </ol>
      <input type="date"/>
    </Wrapper>

  )
}

export default SelectInfo