import React, {useState} from 'react';
import styled from 'styled-components';
import StatisticsChartTitle from './StatisticsChartTitle';
const Wrapper = styled.div`

`
const Chart = styled.div`
  
`

const AccountsCompareChart = ()=>{
  const [category,setCategory] = useState<Category>('-')

  return(
    <Wrapper>
      <StatisticsChartTitle value={category} onChange={(value:Category)=>{}}>每日对比</StatisticsChartTitle>
    <Chart>

    </Chart>

    </Wrapper>
  )
}
export default AccountsCompareChart