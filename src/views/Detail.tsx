import React from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Record from 'component/Record'
import styled from 'styled-components';
import theme from '../theme';

const Wrapper = styled.div`
    padding: 10px;
    .record-wrap{
      margin-bottom: 10px;
    }
`
const Header = styled.header`
  background: ${theme.themeColor};
  color: #fff;
  padding: 16px;
  button{
    background: #51bd83;
    color: #fff;
    padding: 5px 15px;
    border-radius: 2px;
    
  }
  >ol{
  margin-top: 20px;
    font-size: 15px;
    display: flex;
    max-width: 500px;
    justify-content: space-between;
    >li{
      >input{
        border: none;
        fill:#fff;
        color: inherit;
        background: transparent;
        ::-webkit-calendar-picker-indicator {
            color: #fff;
         }
      }  
    }
  }
`
function Detail() {
  const [visible, setVisible] = React.useState<boolean>(false);
  return (
    <>
      <Layout>
        <Header>
          <button>全部類型</button>
            <ol>
              <li><input type="date"/></li>
              <li>縂支出￥100.00</li>
              <li>總收入￥100.00</li>
            </ol>
        </Header>
        <Wrapper>
          <div className="record-wrap">
            <Record/>
          </div>
          <div className="record-wrap">
            <Record/>
          </div>
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