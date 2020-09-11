import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
const Wrapper = styled.div`
  color: #7e7e7e;
  text-align: center;
  padding: 10px;
  margin: 36px;
  font-size: 18px;
`
type Props={
  text:string
}
const NotData:FC<Props> = ({text})=>{
  const [context,setContext] = useState('');
  useEffect(()=>{
    let  timer =0
    timer = setTimeout(()=>{
      setContext(text)
    })
    return()=>{
      clearTimeout(timer)
    }
  },[context,text])
  return(
    <Wrapper>
      {context}
  </Wrapper>)
}

export default NotData