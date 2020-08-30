import {FC, useState} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import {disburseTagsList, incomeTagsList} from 'TagList';

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
       &.selectedSpecial{
        color: ${theme.special.themeColor};
        .icon{
          fill:#fff;
          background: ${theme.special.themeColor};
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



type Props={
  onChange:(value:number)=>void,
  category:string
}
const Tags: FC<Props> = (props) => {
  const [index,setIndex] = useState(0);
  const toggle=(i:number)=>{
    setIndex(i)
  }
  React.useEffect(()=>{
    props.onChange(index)
  },[index])
  return (
    <Wrapper>
      <div className="view">
        <ol>
          {(props.category==='-'?incomeTagsList:disburseTagsList).map((item:TagItem,i:number)=><li onClick={()=>toggle(i)} className={index===i?(props.category==='-'?'selected':'selectedSpecial'):''} key={item.icon}><Icon name={item.icon}/> {item.text}</li>)}
        </ol>
      </div>
    </Wrapper>
  );
};
export default Tags;