import styled from 'styled-components';
import React, {FC, memo} from 'react';
import Header from 'component/common/Header'
import Nav from 'component/common/Nav'

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
      <Header showBackBtn={true}/>
      <Main>
          {props.children}
      </Main>
      <Nav />
    </Wrapper>
  )
})

export default Layout