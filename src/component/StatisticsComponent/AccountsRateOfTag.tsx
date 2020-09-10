import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import TagItemChart from './AccountsRateOfTag/TagItemChart';
import Category from 'component/common/Category';
import StatisticsChartTitle from './StatisticsChartTitle';
import NotData from '../common/NotData';
const Wrapper = styled.section`
  background: #fff;
  padding: 22px 18px;
  margin-top: 6px;

`;
const Container = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  >div{
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;
type Props = {
  value: CategoryRecordAmount
  totalAmount: { '+': number; '-': number }
}
const AccountsRateOfTag: FC<Props> = ({value, totalAmount}) => {
  type xxx = typeof value['-']
  const [amountList, setAmountList] = useState<xxx>();
  const [amount, setAmount] = useState<{ '+': number; '-': number }>({'+': 0, '-': 0});
  const [category, setCategory] = useState<Category>('-');

  const group = () => {
    const tagItemChart = [];

    for (let key in amountList) {
      tagItemChart.push(<TagItemChart key={key} index={key} value={amountList[key]} totalAmount={amount}/>);
    }
    return tagItemChart;
  };
  const recordList = group()
  useEffect(() => {
    setAmountList(value[category]);
    setAmount(totalAmount);
  }, [value,category]);
  return (
    <Wrapper>
      <Container>
        <StatisticsChartTitle onChange={(value: Category) => {setCategory(value);}}
                              value={category}>收支构成</StatisticsChartTitle>
        {recordList.length===0?<NotData text={category==='-'?'暂无支出数据...':'暂无收入数据...'}/>:recordList}
      </Container>

    </Wrapper>
  );
};
export default AccountsRateOfTag;