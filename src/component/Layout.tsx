import styled from 'styled-components';
import React, {FC} from 'react';
import Header from 'component/Header'
import Nav from 'component/Nav'

const LayoutStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;
const Layout:FC =(props)=>{
  return(
    <LayoutStyle>
      <Header />
      <Main>
          {props.children}
      </Main>
      <Nav />
    </LayoutStyle>
  )
}

export default Layout