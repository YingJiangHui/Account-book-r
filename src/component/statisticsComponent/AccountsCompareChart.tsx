import React, {FC, useState} from 'react';
import styled from 'styled-components';
import StatisticsChartTitle from './StatisticsChartTitle';
import dayjs, {OpUnitType} from 'dayjs';
import theme from '../../theme';
import EChart from '../EChart';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  background: #fff;
`;

const Container = styled.div`
  margin-left: 18px;
  margin-right: 18px;
`
type Props = {
  unitTime:OpUnitType
  value: CategoryRecord
  title:string
  startDate:dayjs.Dayjs
}
type Params= {num:number,format:string,name:string,width:string}

const DateMap:{[key:string]:Params}  = {
  'day':{num:29,format:'YYYY年MM月DD日',name:'DD',width:'400%'},
  'month':{num:11,format:'YYYY年MM月',name:'MM',width:'200%'}
}

const AccountsCompareChart: FC<Props> = ({value,unitTime,title,startDate}) => {
  const [category, setCategory] = useState<Category>('-');
  if(startDate){
    startDate = dayjs(startDate.format('YYYY-MM-01')).subtract(1,'day').add(1,'month')
  }
  console.log(startDate.format('YYYY年MM月'))
  let now = dayjs(new Date())
  let currentDate = startDate.format('YYYY年MM月')===now.format('YYYY年MM月')?now:startDate

  const dateList = [];
  const amountList = [];
  console.log(currentDate.format('YYYY-MM'))
  const map =  DateMap[unitTime]
  for (let i = map.num; i >=0 ; i--) {
    const dateDay = currentDate.subtract(i, unitTime).format(map.format);
    const dateStr = currentDate.subtract(i, unitTime).format(map.name);

    if (value[category][dateDay]) {
      amountList.push(value[category][dateDay]);
    } else {
      amountList.push(0);
    }
    dateList.push(dateStr);
  }


  const themeColor = category==='+'?theme.special.themeColor:theme.themeColor;
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
        color:themeColor
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
        opacity:0.3,
      },

      color:[themeColor],
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
        <StatisticsChartTitle value={category} onChange={(value: Category) => {setCategory(value)}}>{title}</StatisticsChartTitle>
      </Container>


  <EChart option={ops} width={map.width}/>
    </Wrapper>
  );
};


export default AccountsCompareChart;