import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import Category from '../common/Category';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
type Props = {
  value:Category
  onChange:(value:Category)=>void
}
const StatisticsChartTitle:FC<Props> = ({value,onChange,children})=>{
  const [category,setCategory] = useState<Category>('-')
  useEffect(()=>{
    setCategory(value)
  },[value])
  return(
    <Wrapper>
      <p>{children}</p>
      <Category value={category} onChange={(value:Category)=>onChange(value)} />
    </Wrapper>
  )
}

export default StatisticsChartTitle