import {FC} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.section`
  background: #fafafa;
  padding: 4px;
  button{
    float: left;
    width: 25%;
    height: 58px;
    font-size: 24px;
    font-weight: bold;background: #fff;
    border: 4px solid #fafafa;
    border-radius: 8px;
    >.icon{
      width: 35px;
      height: 35px;
    }
    &.ok{
      float: right;
      color: #fff;
      height: 174px;
      background: ${theme.themeColor};
    }
    &.zero{
      width: 50%;
    }
  }
`;
const Pad:FC=()=>{
  return (
    <Wrapper className='clearFix'>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button className='del'><Icon name='delete'/></button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button className='ok'>确定</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='zero'>0</button>
      <button>.</button>
    </Wrapper>

  )
}
export default Pad