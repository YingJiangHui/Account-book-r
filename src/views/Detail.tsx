import React from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import Record from 'views/Record'
function Detail() {
  const [visible,setVisible] = React.useState<boolean>(false);
  return (
    <Layout>
      <h2>Detail</h2>
      <OpenRecordButton onClick={()=>setVisible(true)}/>
      <Record onChange={()=>{setVisible(false)}} className={visible?'moveTo':'moveOut'}/>
    </Layout>
  );

}

export default Detail;