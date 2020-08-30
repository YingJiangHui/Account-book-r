import styled from 'styled-components';
import {FC} from 'react';
import React from 'react';
import theme from 'theme'
const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  >ol{
    >li{
      background:#f1f1f1;
      color: #a9a9a9;
      font-size: 14px;
      font-weight: 100;
      border-radius: 25px;
      display: inline-block;
      padding: 5px 10px;
      margin-right:10px ;
      &.selectedBase{
        background: ${theme.tingeColor};
        color: ${theme.themeColor};
        box-shadow: 0 0 2px ${theme.themeColor};
      }
      &.selectedSpecial{
        background: ${theme.special.tingeColorOpacity};
        color: ${theme.special.themeColor};
        box-shadow: 0 0 2px ${theme.special.themeColor};
      }
    }
  }
  input[type=date]{
      font-size: 14px;
      border: none;
      border-radius: 25px;
      background:#f1f1f1;
  }
`;

type Props={
  onChange:(value:string)=>void,
  value:string,
}
const SelectInfo:FC<Props>=(props)=>{
  const categoryMap = {'-':'支出','+':'收入'};
  const categoryStyle = {'-':'selectedBase','+':'selectedSpecial'};
  type keys = keyof typeof categoryMap;
  const [categoryList,SetCategoryList] = React.useState<keys[]>(['-','+'])
  const [selectedItem,setSelectedItem] = React.useState(props.value)
  const onChange=(tag:string)=>{
    setSelectedItem(tag as keys)
    props.onChange(tag);
  }
  return(
    <Wrapper>
      <ol>
        {categoryList.map(el=><li key={el} className={selectedItem===el?categoryStyle[el]:''} onClick={()=>onChange(el)}>{categoryMap[el]}</li>)}
      </ol>
      <input type="date"/>
    </Wrapper>

  )
}

export default SelectInfo