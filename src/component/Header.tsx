import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

const HeaderStyle = styled.header`
  padding: 18px;
  display: flex;
  justify-content: center;
  background: ${theme.themeColor};
  color: ${theme.defaultFontColor};
  font-weight: 200;
  font-size: 17px;
`;

const Header =()=>{
  return(
    <HeaderStyle>账本子</HeaderStyle>
  )
}

export default Header