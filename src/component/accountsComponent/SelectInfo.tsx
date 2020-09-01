import styled from 'styled-components';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import theme from 'theme';
import dayjs from 'dayjs';

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
  }
  input[date]{
      font-size: 14px;
      border: none;
      border-radius: 25px;
      background:#f1f1f1;
  }
`;

type Props = {
  onChangeCategory: (value: Category) => void
  onChangeDate: (value: string) => void
  value: string
}

const SelectInfo: FC<Props> = memo((props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  const categoryStyle = {'-': 'selectedBase', '+': 'selectedSpecial'};
  const categoryList = React.useState<Category[]>(['-', '+'])[0];
  const [selectedItem, setSelectedItem] = React.useState(props.value);
  const onChange = (tag: Category) => {
    setSelectedItem(tag);
    props.onChangeCategory(tag);
  };
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD')
  const [date, setDate] = useState(nowDate);

  useEffect(() => {
    props.onChangeDate(nowDate);
  },[date]);
  return (
    <Wrapper>
      <ol>
        {categoryList.map((el: Category) => <li key={el} className={selectedItem === el ? categoryStyle[el] : ''}
                                                onClick={() => onChange(el)}>{categoryMap[el]}</li>)}
      </ol>
      <input type="date" value={date} onChange={(e) => {setDate(e.target.value);}}/>
    </Wrapper>

  );
});

export default SelectInfo;