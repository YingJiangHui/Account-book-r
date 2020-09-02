import React from 'react';
import Layout from '../component/Layout';
import PopUpSelect from '../component/PopUpSelect';

function Statistics() {
  return (
    <Layout>
      <PopUpSelect title='请选择月份'/>
      <h2>Statistics</h2>
    </Layout>
  );
}

export default Statistics;