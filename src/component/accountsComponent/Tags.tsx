import {FC, useState} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import {useDisburseTagsList, useIncomeTagsList} from '../../useTags';
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
      &.base-selected{
        color: ${theme.themeColor};
        .icon{
          fill:#fff;
          background: ${theme.themeColor};
        }
      }
       &.special-selected{
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
  category:string,
  className:string,
}
const Tags: FC<Props> = (props) => {
  const {incomeTags,setIncomeTags} = useIncomeTagsList()
  const {disburseTags,setDisburseTags} = useDisburseTagsList()

  const [index,setIndex] = useState(0);
  const toggle=(i:number)=>{
    setIndex(i)
  }
  React.useEffect(()=>{
    setIndex(0)
  },[props.category])
  React.useEffect(()=>{
    props.onChange(index)
  },[index])
  return (
    <Wrapper>
      <div className="view">
        <ol>
          {(props.category==='-'?incomeTags:disburseTags).map((item:TagItem,i:number)=><li onClick={()=>toggle(i)} className={index===i?props.className+'-selected':''} key={item.icon}><Icon name={item.icon}/> {item.text}</li>)}
        </ol>
      </div>
    </Wrapper>
  );
};
export default Tags;