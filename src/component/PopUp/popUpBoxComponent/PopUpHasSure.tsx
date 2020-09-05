import PopUp from '../popUpRootComponent/PopUp';
import React, {FC, useEffect, useState} from 'react';
import Icon from 'component/Icon';
import styled from 'styled-components';
import theme from '../../../theme';

const Control = styled.ol`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >li{
    
        &:nth-child(1){
          width: 50px;
            >.icon{
              width: 20px;
              height: 30px;
              fill:${theme.tingeFontColor};
            }
         }
        &:nth-child(3){
            width: 50px;
           color: ${theme.themeColor};
        }
        &.disable-click{
           color: ${theme.tingeColor};
        }
      }
`

type Props = {
  show:boolean
  title:string
  onEnsure:()=>void
  disable:boolean
  close:()=>void
}
const PopUpHasSure:FC <Props> = ({show,title,onEnsure,disable,children,close})=>{
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    setVisible(show)
  },[show])
  return (
    <PopUp show={visible}>
      <Control>
        <li onClick={close}><Icon name='left'/></li>
        <li>{title}</li>
        <li onClick={onEnsure} className={disable?'disable-click':''}>确定</li>
      </Control>
      {children}
    </PopUp>
  )
}
export default PopUpHasSure