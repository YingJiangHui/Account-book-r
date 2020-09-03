import React, {FC, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Records from 'component/Records';
import {Header, Wrapper} from 'component/Detail/style';
import useRecords from 'hooks/useRecords';
import Tooltip from '../component/Tooltip';
import PopUpSelect from '../component/PopUpMonthBox';
import dayjs from 'dayjs';
import PopUpMonthBox from '../component/PopUpMonthBox';


const nowMonth = dayjs(new Date()).format('MM月');
const Detail: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);

  const {filterRecordUsedMonth, fetchRecord} = useRecords();
  const [visibleTip, setVisibleTip] = useState(false);
  const [appearMonth, setAppearMonth] = useState(nowMonth);

  return (
    <>
      <Tooltip value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button onClick={() => {/*setVisibleMonth(true)*/}}>全部类型</button>
          <ol>
            <li onClick={() => {setVisibleMonth(true);}}>{appearMonth}</li>
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
          fetchRecord();
          setVisibleTip(true);
          setTimeout(() => {setVisibleTip(false);}, 2000);
        }}
        onOpen={() => {setVisible(true);}}
        onClose={() => {setVisible(false);}}
        className={visible ? 'moveTo' : 'moveOut'}
      />
      <PopUpMonthBox show={visibleMonth} close={() => setVisibleMonth(false)} onChange={(value: string) => {
        setAppearMonth(value);
        setVisibleMonth(false);
      }}/>
    </>
  );

};

export default Detail;