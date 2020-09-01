import styled from 'styled-components';
import React, {FC} from 'react';

const Wrapper = styled.div`
  >ol{
      z-index: 9;
      position: absolute;
      min-width: 129px;
      justify-content: space-between;
      display: flex;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    >li{
    &:active{
      background: rgba(0,0,0,0.8);
    }
    &:nth-child(1){
      border-radius: 5px 0 0  5px;
    }
    &:nth-child(2){
      border-radius: 0 5px 5px 0;
    }
      padding:  10px 16px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #242424;
      color: #fff;
      font-size: 16px;
      &::after{
      
        transform: translateY(50%);
        bottom: 0;
        position: absolute;
        content: '';
        height: 0;
        width: 0;
        border-width: 5px;
        border-style: solid;
      }
      &:nth-child(1)::after{
        right: 0;
        border-color: transparent #242424 transparent transparent;
      }
      &:nth-child(2)::after{
        left: 0;
        border-color: transparent transparent transparent #242424;
      }
    }
  }   
`;

type Props = {
  x:()=>void,
  y:()=>void,
}
const PopOptionBox: FC<Props> = (props) => {
  return (
    <Wrapper>
      <ol >
        <li onClick={props.x}>编辑</li>
        <li onClick={props.y}>删除</li>
      </ol>
    </Wrapper>
  );
};

export default PopOptionBox;