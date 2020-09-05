import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import TagItemChart from './AccountsRateOfTag/TagItemChart';

const Wrapper = styled.section`
  
  background: #fff;
  padding: 18px;
  margin-top: 6px;
  >div{
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
type Props = {
  value: { [key: string]: number }
  totalAmount: { '+': number; '-': number }
}
const AccountsRateOfTag: FC<Props> = ({value, totalAmount}) => {
  const [amountList, setAmountList] = useState<{ [key: string]: number }>();
  const [amount, setAmount] = useState<{ '+': number; '-': number }>({'+': 0, '-': 0});

  const group = ()=>{
    const tagItemChart = []
    for(let key in amountList){
      tagItemChart.push(<TagItemChart key={key} index={key} value={amountList[key]} totalAmount={amount}/>)
    }
    return tagItemChart
  }
  useEffect(() => {
    setAmountList(value);
    setAmount(totalAmount);
  }, [value]);
  return (
    <Wrapper>

      {group()}
    </Wrapper>
  );
};
export default AccountsRateOfTag;