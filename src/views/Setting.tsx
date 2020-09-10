import React, {createContext, FC, useContext} from 'react';
import Layout from '../component/common/Layout';
import 'style/animation.scss'
import useTest,{Action} from 'hooks/useTest';
// import Child from '../component/Child';
import useUpdate from '../hooks/useUpdate';

const TestContext = createContext<Action>({} as Action)

function Setting() {
  const  xxx= useTest()
  const {add,print,count,setCount} = xxx
  useUpdate(()=>{
    console.log(count)
  },[count])
  return (
    <Layout>
      <TestContext.Provider value={xxx}>
        <button onClick={()=>{add(1)}}>add</button>
        <Child></Child>
      </TestContext.Provider>
      正在努力开发中
    </Layout>
  );
}
const Child= ()=>{
  const xxx = useContext(TestContext)

  return(
    <>
      <button onClick={()=>{xxx.add(1)}}>add2</button>
    </>
  )
}
export default Setting;