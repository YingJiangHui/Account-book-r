import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import theme from '../theme';

const Wrapper = styled.section`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  header{
     padding: 16px;
     height: 68px;
     background: rgb(251, 251, 251);
     display: flex;
     justify-content: space-between;
     align-items: center;
     >.date{
      
     }
     >ol{
       display: flex;
       width: 200px;
       justify-content: space-between;
       align-items: center;
     }
  }
  main{
    height: 76px;     
    padding: 16px;
     background: #fff;
     display: flex;
     justify-content: space-between;
     align-items: center;
     >ol{
      justify-content: space-between;
      width: 130px;
      display: flex;
      .done{
        margin-top: 5px;
        font-size: 14px;
        font-weight: 200;
        color: ${theme.tingeFontColor};
      }
     }
     .icon-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        >.icon{
          border-radius: 50%;
          padding: 7.5px;
          fill:#fff;
          background: ${theme.themeColor};
          height: 40px;
          width: 40px;
        }
     }
  }
`;
const Record = () => {
  return (
    <Wrapper>
      <header>
        <div className="date">8月27日 今天</div>
        <ol>
          <li>支 10.00</li>
          <li>收 0.00</li>
        </ol>
      </header>
      <main>
        <ol>
          <li className="icon-wrapper">
            <Icon name='learn'/>
          </li>
          <li>
            <ul>
              <li>餐饮</li>
              <li className='done'>20:32 | 吃饭</li>
            </ul>
          </li>
        </ol>
        <div>-10.00</div>
      </main>
    </Wrapper>
  );
};

export default Record;