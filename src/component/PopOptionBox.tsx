import styled from 'styled-components';
import React, {FC} from 'react';

const Wrapper = styled.div`
  >ol{
      position: absolute;
      max-width: 129px;
      justify-content: space-between;
      display: flex;
    >li{
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
  pos?: { left: number, top: number }
}
type Pos=
{ left: number, top: number }
type PosStr = {left:string,top:string}
const PopOptionBox: FC<Props> = (props) => {
  const leftRef = React.useRef<HTMLLIElement>(null);
  const computerPos = ({top,left}:Pos):PosStr => {
    const {clientWidth, clientHeight} = leftRef.current || {clientWidth: 0, clientHeight: 0};
    return {left: (left - clientWidth).toString() + 'px', top: (top - clientHeight).toString + 'px'};
  };

  return (
    <Wrapper>
      <ol style={computerPos(props.pos||{left:0,top:0})}>
        <li ref={leftRef}>编辑</li>
        <li>删除</li>
      </ol>
    </Wrapper>
  );
};

export default PopOptionBox;