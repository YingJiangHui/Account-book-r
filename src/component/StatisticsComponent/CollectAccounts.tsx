import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import PopUpMonthBox from 'component/PopUp/PopUpMonthBox';
import useRecords from 'hooks/useRecords';
import dayjs from 'dayjs';

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
  .outgoings{
    color: #7e7e7e;
  }
`;
const Income = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color:${theme.themeColor};
  >p:last-child{
    min-width: 98px;
    margin-top: 16px;
    font-size: 36px;
  }
`;

const zero = (num: number) => {
  return num === 0 ? '0.00' : num;
};

const now = dayjs(new Date());

type Props = {
  onChange: (value:dayjs.Dayjs) => void
  stream:({}:{'+':number,'-':number})=>void
  monthRecord:(record:RecordItem[])=>void
}

const CollectAccounts: FC<Props> = ({onChange,stream,monthRecord}) => {
  const [visible, setVisible] = useState(false);
  const [month, setMonth] = useState(now);
  const {totalAmount, filterRecordUsedMonth} = useRecords();
  const record = filterRecordUsedMonth(month.format('YYYY年MM月'));
  const outgoings = totalAmount(record, '-');
  const income = totalAmount(record, '+');
  useEffect(()=>{
    stream({'-':outgoings,'+':income})
    monthRecord(record)
  },[outgoings,income])
  return (
    <>
      <Wrapper>
        <button onClick={() => {setVisible(true);}}>{month.format('YYYY年MM月')}</button>
        <Income>
          <p>共支出</p>
          <p>￥{zero(outgoings)}</p>
        </Income>
        <p className={'outgoings'}>共收入￥{zero(income)}</p>
      </Wrapper>
      <PopUpMonthBox show={visible} close={() => setVisible(false)} onChange={(value) => {
        setVisible(false);
        setMonth(value);
        onChange(value);
      }}/>
    </>
  );
};

export default CollectAccounts;