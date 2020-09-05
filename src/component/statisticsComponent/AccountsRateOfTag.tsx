import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import TagItemChart from '../AccountsRateOfTag/TagItemChart';
import Category from 'component/Category'
import StatisticsChartTitle from './StatisticsChartTitle';
const Wrapper = styled.section`
  background: #fff;
  padding: 18px;
  margin-top: 6px;

`;
const  Container =styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  >div{
    margin-bottom: 20px;
    margin-top: 20px;
  }
`
type Props = {
  value: { [key: string]: number }
  totalAmount: { '+': number; '-': number }
}
const AccountsRateOfTag: FC<Props> = ({value, totalAmount}) => {
  console.log('rate');
  console.log(value);
  const [amountList, setAmountList] = useState<{ [key: string]: number }>();
  const [amount, setAmount] = useState<{ '+': number; '-': number }>({'+': 0, '-': 0});
  const [category,setCategory] = useState<Category>('-');
  const group = ()=>{
    const tagItemChart = []
    for(let key in amountList){
      tagItemChart.push(<TagItemChart category={category} key={key} index={key} value={amountList[key]} totalAmount={amount}/>)
    }
    return tagItemChart
  }
  useEffect(() => {
    setAmountList(value);
    setAmount(totalAmount);
  }, [value]);
  return (
    <Wrapper>
      <Container>
        <StatisticsChartTitle onChange={(value:Category)=>{setCategory(value)}} value={category}>收支构成</StatisticsChartTitle>

        {group()}
      </Container>

    </Wrapper>
  );
};
export default AccountsRateOfTag;