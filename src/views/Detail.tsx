import React from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import Record from 'views/Record'
function Detail() {
  const [visible,setVisible] = React.useState(false);
  const openRecord = () => {
    setVisible(true)
  };
  React.useEffect(()=>{
    console.log(visible)
  },[visible])
  return (
    <Layout>
      <h2>Detail</h2>
      <OpenRecordButton onClick={openRecord}/>
      <Record className={visible?'moveTo':'moveOut'}/>
    </Layout>
  );

}

export default Detail;