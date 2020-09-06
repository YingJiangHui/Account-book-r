import styled from 'styled-components';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import theme from 'theme';
import dayjs from 'dayjs';
import Category from 'component/Category'
import HintBox from '../PopUp/HintBox';
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
  input[type=datetime-local]{
      font-size: 14px;
      border: none;
      border-radius: 25px;
      background:#f1f1f1;
  }
`;

type Props = {
  onChangeCategory: (value: Category) => void
  category: string
  onChangeDate: (value: string) => void
  defaultDate?: string
}
const nowDate = dayjs(new Date());

const SelectInfo: FC<Props> = memo((props) => {
  const {onChangeCategory,defaultDate} = props
  const [date, setDate] = useState(nowDate.format('YYYY-MM-DDTHH:mm'));
  const [category,setCatecory] = useState('-')
  const [hintVisible,setHintVisible] = useState(false)
  useEffect(()=>{
    if(defaultDate)
    setDate(dayjs(defaultDate).format('YYYY-MM-DDTHH:mm'))
  },[defaultDate])

  useEffect(() => {
    props.onChangeDate(date);
  }, [date]);
  return (
    <>
    <Wrapper>
      <Category value={category} onChange={(value)=>onChangeCategory(value)}/>
      <input type="dateTime-local"
             value={date}
             onChange={(e) => {
               const now = new Date()
               const date = e.target.value + dayjs(now).format(':ss')
               if(dayjs(date).format('YYYY-MM-DDT-HH:mm:ss')>dayjs(now).format('YYYY-MM-DDT-HH:mm:ss')){
                 setHintVisible(true)
                 setDate((d)=>d)
               }else{
                 setDate(e.target.value + dayjs(new Date()).format(':ss'));
               }
             }}/>
    </Wrapper>
      <HintBox show={hintVisible} onChange={(value:boolean)=>{setHintVisible(false)}} text={'不能设置时间为将来'}/>
      </>
  );
});

export default SelectInfo;