import {FC, useState} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

const Wrapper = styled.section`
  .view{
    padding-bottom: 10px;
    width: 100vw;
    overflow: auto;
    >ol{
    height: 68px;
    margin-top: 20px;
    display: flex;
    margin-left: -6px;
    >li{
      &.selected{
        color: ${theme.themeColor};
        .icon{
          fill:#fff;
          background: ${theme.themeColor};
        }
      }
      height: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 100;
      color: #7c7c7c;
      min-width: 60px;
      .icon{
        height: 40px;
        width: 40px;
        background: #ececec;
        border-radius: 50%;
        padding: 7.5px;
        fill:#c7c7c7;
      }
    }
  }
  }
`;
type TagItem = {
  icon: string,
  text: string,
}
const incomeTagsList: TagItem[] = [
  {icon: 'clothes', text: '服装美容'},
  {icon: 'fun', text: '娱乐'},
  {icon: 'learn', text: '学习'},
  {icon: 'medical', text: '医疗'},
  {icon: 'shopping', text: '购物'},
  {icon: 'sport', text: '运动健身'},

  {icon: 'salary', text: '薪水'},
  {icon: 'transfer', text: '转账'},
];
const disburseTagsList: TagItem[] = [
  {icon: 'salary', text: '薪水'},
  {icon: 'transfer', text: '转账'},
];


const Tags: FC = () => {
  const [index,setIndex] = useState(0);
  const toggle=(i:number)=>{
    setIndex(i)
  }
  return (
    <Wrapper>
      <div className="view">
        <ol>
          {incomeTagsList.map((item:TagItem,i:number)=><li onClick={()=>toggle(i)} className={index===i?'selected':''} key={item.icon}><Icon name={item.icon}/> {item.text}</li>)}
        </ol>
      </div>
    </Wrapper>
  );
};
export default Tags;