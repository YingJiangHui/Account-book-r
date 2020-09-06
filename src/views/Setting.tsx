import React, {useState} from 'react';
import Layout from '../component/Layout';
import 'style/animation.scss'
function Setting() {
  const [state, setState] = useState(false);
  return (
    <Layout>
      <input type="text"/>
    </Layout>
  );
}

export default Setting;