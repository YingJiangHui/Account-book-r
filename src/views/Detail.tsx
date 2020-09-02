import React, {FC, useState} from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Records from 'component/Records';
import {Header, Wrapper} from 'component/Detail/style';
import useRecords from 'hooks/useRecords';
import Tooltip from '../component/Tooltip';

const Detail: FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const {fetchRecord} = useRecords();
  const [visibleTip, setVisibleTip] = useState(false);
  return (
    <>
      <Tooltip value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button>全部类型</button>
          <ol>
            <li><input type="date"/></li>
            <li>总支出￥100.00</li>
            <li>总收入￥100.00</li>
          </ol>
        </Header>
        <Wrapper>
          {fetchRecord().map((record, index) => <Records key={index} recordItem={record}/>)}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisible(true)}/>
      <KeepAccounts
        ensure={() => {setVisibleTip(true); setTimeout(()=>{setVisibleTip(false)},2000)}}
        onOpen={() => {setVisible(true);}}
        onClose={() => {setVisible(false);}}
        className={visible ? 'moveTo' : 'moveOut'}
      />
    </>
  );

};

export default Detail;