import React, {FC, useState} from 'react';
import styled from 'styled-components';
import StatisticsChartTitle from './StatisticsChartTitle';
import dayjs from 'dayjs';
import theme from '../../theme';
import EChart from '../EChart';

const Wrapper = styled.div`
  background: #fff;
  overflow: hidden;
`;

const Container = styled.div`
  padding: 18px;
`
type Props = {
  value: { [key: string]: number }
}
const AccountsCompareChart: FC<Props> = ({value}) => {
  const [category, setCategory] = useState<Category>('-');
  const now = dayjs(new Date());
  const dateList = [];
  const amountList = [];
  console.log(value)
  for (let i = 29; i >=0 ; i--) {
    const dateDay = now.subtract(i, 'day').format('YYYY年MM月DD日');
    const dateStr = now.subtract(i, 'day').format('DD');

    if (value[dateDay]) {
      amountList.push(value[dateDay]);
    } else {
      amountList.push(0);
    }
    dateList.push(dateStr);
  }

  const ops = {
    xAxis: {
      axisLine:{
        lineStyle:{
          width:1,
          color:'rgba(0,0,0,0.1)'
        }
      },
      axisLabel:{
        color:theme.tingeFontColor
      },
      axisTick:{
        show:false
      },
      type: 'category',
      data: dateList,
    },
    tooltip: {
      backgroundColor:'transparent',
      trigger: 'item',
      position: 'top',
      textStyle:{
        color:theme.themeColor
      }
    },

    yAxis: {
      splitLine:{
        show:false
      },
      axisLine: {

        show: false
      },
      type: 'value'
    },
    series: [{
      data: amountList,
      type: 'bar',
      itemStyle:{
        opacity:0.5,
      },

      color:['#3eb575','#3eb575','#3eb575'],
      barWidth : 10,
    }],
    grid: {
      left: 0,
      top: 32,
      right: 18,
      bottom: 32
    }
  };



  return (
    <Wrapper>
      <Container>
        <StatisticsChartTitle value={category} onChange={(value: Category) => {setCategory(value)}}>每日对比</StatisticsChartTitle>
      </Container>

  <EChart option={ops}/>
    </Wrapper>
  );
};


export default AccountsCompareChart;