import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
import PopUpMonthBox from 'component/PopUpMonthBox'
import useRecords from 'hooks/useRecords'
import dayjs from 'dayjs'
const Wrapper = styled.section`
  min-height: 220px;
  background: #fff;
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  >button{
    padding: 8px 12px;
    background: #f7f7f7;
  }
`
const Income = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color:${theme.themeColor};
  >p:last-child{
    margin-top: 16px;
    font-size: 36px;
  }
`

const zero = (num:number)=>{
  return num===0?'0.00':num
}

const now = dayjs(new Date()).format('YYYY年MM月')
const CollectAccounts = ()=>{
  const [visible,setVisible] = useState(false);
  const [month,setMonth] = useState(now);
  const {totalAmount,filterRecordUsedMonth} = useRecords();
  const record = filterRecordUsedMonth(month)
  const outgoing = totalAmount(record,'-')
  const income = totalAmount(record,'+')
  return(
    <>
    <Wrapper>
      <button onClick={()=>{setVisible(true)}}>{month}</button>
      <Income>
        <p>共支出</p>
        <p>￥{zero(outgoing)}</p>
      </Income>
      <p>共收入￥{zero(income)}</p>
    </Wrapper>
      <PopUpMonthBox show={visible}　close={()=>setVisible(false)} onChange={(value)=>{
        setVisible(false);
        setMonth(value)
      }}/>
      </>
  )
}

export default CollectAccounts