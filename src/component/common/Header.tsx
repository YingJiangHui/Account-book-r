import React, {FC} from 'react';
import styled from 'styled-components';
import theme from 'theme';
import Icon from './Icon';
import {useHistory} from 'react-router';

const HeaderStyle = styled.header`
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.themeColor};
  color: ${theme.defaultFontColor};
  font-weight: 200;
  font-size: 17px;
  position: relative;
  .icon{
    width: 24px;
    height: 24px;
    fill: #fff;
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
type Props={
  showBackBtn?:boolean
}
const Header:FC<Props> =({showBackBtn})=>{
  const history = useHistory()
  return(
    <HeaderStyle>{showBackBtn?<Icon name={'left'} onClick={()=>{history.goBack()}}/>:''} <span>账本子</span></HeaderStyle>
  )
}

export default Header