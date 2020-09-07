import styled from 'styled-components';
import React, {FC, memo} from 'react';
import Header from 'component/Header'
import Nav from 'component/Nav'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  flex-grow: 1;
  overflow: auto;
`;
const Layout:FC =memo((props)=>{

  return(

    <Wrapper>
      <Header />
      <Main>
          {props.children}
      </Main>
      <Nav />
    </Wrapper>
  )
})

export default Layout