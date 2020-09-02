import React, {FC} from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Record from 'component/Record'
import {Header,Wrapper} from 'component/Detail/style'
import useRecords from 'hooks/useRecords'
const  Detail:FC=()=> {
  const [visible, setVisible] = React.useState<boolean>(false);
  const {recordList,setRecordList,addRecord} = useRecords()
  return (
    <>
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
          {recordList.map(record=><Record/>)}

        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisible(true)}/>
      <KeepAccounts
        onOpen={() => {setVisible(true);}}
        onClose={() => {setVisible(false);}}
        className={visible ? 'moveTo' : 'moveOut'}
      />
    </>
  );

}

export default Detail;