import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import theme from '../../theme';
import cs from 'classnames'
const Wrapper = styled.div`
    min-width: 128px;
    >button{
      background:#f1f1f1;
      color: #a9a9a9;
      font-size: 14px;
      font-weight: 100;
      border-radius: 25px;
      display: inline-block;
      padding: 5px 10px;
      margin-right:10px ;
      &:last-child{
      margin-right:0;
      }
      &.selectedBase{
        background: ${theme.tingeColorOpacity};
        color: ${theme.themeColor};
        box-shadow: 0 0 2px ${theme.themeColor};
      }
      &.selectedSpecial{
        background: ${theme.special.tingeColorOpacity};
        color: ${theme.special.themeColor};
        box-shadow: 0 0 2px ${theme.special.themeColor};
      }
    }
`;

type Props = {
  value: string
  onChange: (value: Category) => void
}
const Category: FC<Props> = ({value, onChange}) => {
  const categoryMap: { [key: string]: string } = {'+': '收入', '-': '支出'};
  const categoryList: Category[] = ['-', '+'];
  const [selected,setSelected] = useState('-')
  const styleMap = {'+':'selectedSpecial','-':'selectedBase'}
  useEffect(()=>{
    setSelected(value)
  },[value])
  return (
    <Wrapper>
        {categoryList.map(category =>
          <button className={cs(category===selected?styleMap[selected]:'')} key={category} onClick={()=>{onChange(category);}}>{categoryMap[category]}</button>
        )}
    </Wrapper>
  );
};
export default Category;