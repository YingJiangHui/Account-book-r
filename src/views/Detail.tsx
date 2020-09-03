import React, {FC, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Records from 'component/Records';
import {Header, Wrapper} from 'component/Detail/style';
import useRecords from 'hooks/useRecords';
import Tooltip from '../component/Tooltip';
import PopUpSelect from '../component/PopUp/PopUpSelect';
import styled from 'styled-components';
import theme from '../theme';
import dayjs from 'dayjs';
import {filter} from 'minimatch';

const Container = styled.div`
  padding: 16px 12px 16px 12px;
p{
  margin: 8px;
  color: ${theme.tingeFontColor};
  text-align: center;
}
>ol{
  display: flex;
  flex-wrap: wrap;
  >li{ 
  font-size: 18px;
  border: 4px solid #fafafa;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 25%;
  }
}

`;
const nowMonth = dayjs(new Date()).format('MM月')
const Detail: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);
  const {filterRecordUsedMonth,ref} = useRecords();
  const [visibleTip, setVisibleTip] = useState(false);
  const [appearMonth,setAppearMonth]=useState(nowMonth)

  const selectMonth = (e: React.MouseEvent) => {
    const month = (e.target as Element).nodeName === 'LI' ? (e.target as Element).textContent : '';
    setAppearMonth(month!)
    setVisibleMonth(false)
  };
  return (
    <>
      <Tooltip value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button onClick={() => setVisibleMonth(true)}>全部类型</button>
          <ol>
            <li onClick={() => setVisibleMonth(true)}>{appearMonth}</li>
            <li>总支出￥100.00</li>
            <li>总收入￥100.00</li>
          </ol>
        </Header>
        <Wrapper>
          {filterRecordUsedMonth(appearMonth).map((record, index) => <Records key={index} recordItem={record}/>)}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisible(true)}/>
      <KeepAccounts
        ensure={() => {
          setVisibleTip(true);
          setTimeout(() => {setVisibleTip(false);}, 2000);
        }}
        onOpen={() => {setVisible(true);}}
        onClose={() => {setVisible(false);}}
        className={visible ? 'moveTo' : 'moveOut'}
      />
      <PopUpSelect close={() => setVisibleMonth(false)} show={visibleMonth} title='选择月份'>
        <Container>
          <p>{dayjs(new Date()).format('YYYY年')}</p>
          <ol
            onClick={selectMonth}>
            {[0, 1, 2, 3, 4, 5, 6].map((month) => <li
              key={month}>{dayjs(new Date()).subtract(month, 'month').format('MM月')}</li>)}
          </ol>
        </Container>
      </PopUpSelect>
    </>
  );

};

export default Detail;