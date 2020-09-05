import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import TagItemChart from '../AccountsRateOfTag/TagItemChart';
import Category from 'component/Category'
const Wrapper = styled.section`
  
  background: #fff;
  padding: 18px;
  margin-top: 6px;
  >div{
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  
`
type Props = {
  value: { [key: string]: number }
  totalAmount: { '+': number; '-': number }
}
const AccountsRateOfTag: FC<Props> = ({value, totalAmount}) => {
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
      <Title>
        <p>收支构成</p>
        <Category onChange={(value:Category)=>{setCategory(value)}} value={category}/>
      </Title>
      {group()}
    </Wrapper>
  );
};
export default AccountsRateOfTag;