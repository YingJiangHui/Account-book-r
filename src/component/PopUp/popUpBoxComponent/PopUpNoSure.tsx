import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';
import {CSSTransition} from 'react-transition-group'; // ES6
import theme from '../../../theme';
import PopUp from 'component/PopUp/popUpRootComponent/PopUp'

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


type Props = {
  title: string,
  show:boolean,
  close:()=>void
}
const PopUpNoSure: FC<Props> = ({title,children,show,close}) => {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    setVisible(show)
  },[show])
  return (
      <PopUp show={visible} style={{background:'#fafafa'}}>
        <div>
          <Control>
            <li onClick={close}><Icon name='close'/></li>
            <li>{title}</li>
          </Control>
          {children}
        </div>
      </PopUp>
  );
};
export default PopUpNoSure;