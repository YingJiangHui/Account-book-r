import React, {useState} from 'react';
import Layout from '../component/Layout';
import AlertSelectBox from 'component/PopUp/AlertSelectBox'
function Statistics() {
  const [count,setCount] = useState(0)
  return (

      <Layout>
        <h2>Statistics</h2>
    </Layout>
  );
}

export default Statistics;