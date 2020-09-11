import React, {FC, useState} from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import PopUpMonthBox from 'component/PopUp/PopUpMonthBox';
import dayjs from 'dayjs';
import monetaryUnit from 'lib/monetaryUnitFormat'
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

const now = dayjs(new Date());

type Props = {
  value:{'+':number,'-':number}
  onChange:(month: dayjs.Dayjs)=>void
}

const CollectAccounts: FC<Props> = ({value,onChange}) => {

  const [visible, setVisible] = useState(false);
  const [month, setMonth] = useState(now);

  return (
    <>
      <Wrapper>
        <button onClick={() => {setVisible(true);}}>{month.format('YYYY年MM月')}</button>
        <Income>
          <p>共支出</p>
          <p>￥{monetaryUnit(parseFloat(value['-'].toFixed(2)),false)}</p>
        </Income>
        <p className={'outgoings'}>共收入￥{monetaryUnit(value['+'],false)}</p>
      </Wrapper>
      <PopUpMonthBox show={visible} close={() => setVisible(false)} onChange={(value: dayjs.Dayjs) => {
        setVisible(false);
        setMonth(value);
        onChange(value);
      }}/>
    </>
  );
};

export default CollectAccounts;