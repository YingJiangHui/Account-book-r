import React, {FC, useState} from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import {CSSTransition} from 'react-transition-group'; // ES6
import theme from '../../theme';
import PopUp from 'component/PopUp/PopUp'

const Control = styled.ol` 
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
   .icon{
        fill:${theme.tingeFontColor};
        width: 25px;
        height: 25px;
      }
  >li{
    &:nth-child(2){
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50% ,-50%);
   
    }
  }
`;
const List = styled.ol`
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  >li{ 
  font-size: 18px;
  border: 4px solid #fafafa;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 25%;
  }
`;

type Props = {
  title: string,
}
const PopUpSelect: FC<Props> = ({title,children}) => {
  const [inProp, setInProp] = useState(false);
  return (
      <PopUp show={inProp} style={{background:'#fafafa'}}>
        <div>
          <Control>
            <li onClick={()=>setInProp(false)}><Icon name='close'/></li>
            <li>{title}</li>
          </Control>
          {children}
        </div>
      </PopUp>
  );
};
export default PopUpSelect;