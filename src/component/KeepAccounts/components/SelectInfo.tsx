import styled from 'styled-components';
import {FC, memo, useEffect, useRef, useState} from 'react';
import React from 'react';
import theme from 'theme';
import dayjs from 'dayjs';
import Category from 'component/common/Category';
import HintBox from '../../PopUp/HintBox';

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
  >input[type=datetime-local]{
   text-align: end;
      font-family: inherit;
      transition: .3s;
      background: transparent;
      margin-left: auto;
      color: #b2b2b2;
      padding: 0 10px;
      border-color: transparent;
      border-style: solid;
      border-bottom-color: rgba(0,0,0,0.1);
      border-width: 1px;
      &:focus{
      border-bottom-color: ${theme.themeColor};
      color: ${theme.themeColor};
    }
`;

type Props = {
  onChangeCategory: (value: Category) => void
  category: string
  onChangeDate: (value: string) => void
  defaultDate?: string
}

const SelectInfo: FC<Props> = memo((props) => {
  const currentDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
  const {onChangeCategory, defaultDate, onChangeDate} = props;
  const [date, setDate] = useState(currentDate);
  const [category, setCatecory] = useState('-');
  const [hintVisible, setHintVisible] = useState(false);
  const refDate = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (defaultDate) {
      setDate(dayjs(defaultDate).format('YYYY-MM-DDTHH:mm:ss'));
    }
  }, [defaultDate]);
  useEffect(() => {
    setCatecory(props.category);
  }, [props.category]);

  return (
    <>
      <Wrapper>
        <Category value={category} onChange={(value) => onChangeCategory(value)}/>
        <input
          ref={refDate}
          type="dateTime-local"
          value={date}
          onClick={()=>{refDate.current?.click()}}
          onChange={(e) => {
            if (!e.target.value)
              return;
            const now = dayjs(new Date()).format('YYYY-MM-DDT-HH:mm:ss');
            const date = e.target.value + dayjs(now).format(':ss');
            if (dayjs(date).format('YYYY-MM-DDT-HH:mm:ss') > now) {
              setHintVisible(true);
              setDate((d) => d);
            } else {
              setDate(date);
              onChangeDate(date);
            }
          }}/>
      </Wrapper>
      <HintBox show={hintVisible} onChange={(value: boolean) => {setHintVisible(value);}} text={'不能设置时间为将来'}/>
    </>
  );
});

export default SelectInfo;