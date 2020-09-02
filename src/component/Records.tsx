import React, {FC} from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import theme from '../theme';
import dayjs from 'dayjs';
import {useTags}from 'hooks/useTags'
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
       min-width: 130px;
       justify-content: space-between;
       align-items: center;
       >li{
        margin-left: 10px;
       }
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
        min-width: 70px;
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

type Props={
  recordItem:RecordItem
}
const Records:FC<Props> = (props) => {

  const {findTag}= useTags()
  const {recordItem} = props
  return (
    <Wrapper>
      <header>
        <div className="date">{dayjs(recordItem.createAt).format('MM月DD日')}</div>
        <ol>
          <li>支 {recordItem.category==='-'?recordItem.amount:'0.00'}</li>
          <li>收 {recordItem.category==='+'?recordItem.amount:'0.00'}</li>
        </ol>
      </header>
      <main>
        <ol>
          <li className="icon-wrapper">
            <Icon name='learn'/>
          </li>
          <li>
            <ul>
              <li>{findTag(recordItem.tagIndex)?.text}</li>
              <li className='done'>{dayjs(recordItem.createAt).format('HH:mm')} {recordItem.note?'| '+recordItem.note:''}</li>
            </ul>
          </li>
        </ol>
        <div>{(recordItem.category==="+"?'+':'-')+recordItem.amount}</div>
      </main>
    </Wrapper>
  );
};

export default Records;