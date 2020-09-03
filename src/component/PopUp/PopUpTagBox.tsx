import PopUpSelect from 'component/PopUp/PopUpSelect';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTags} from 'hooks/useTags';
import theme from '../../theme';
import cn from 'classnames';

const Container = styled.main`
  padding: 16px;
  display: flex;
  flex-direction: column;
   >p{
   margin-top: 10px;
   margin-bottom: 10px;

   color: ${theme.tingeFontColor};
   font-size: 14px;
   }
  >ol{
    display: flex;
    flex-wrap: wrap;
    >li{
      &.selected{
      color: #fff;
        background: ${theme.themeColor};
      }
      width: 33.3%;
      border: 5px solid rgb(250, 250, 250);
      background: #fff;
      line-height: 58px;
      text-align: center;
    }
  }
`;

type Props = {
  close: () => void
  show: boolean
  onChange: (value: string, category?: Category) => void
  value: TagItem[]
}
const PopUpTagBox: FC<Props> = ({close, show, value, onChange}) => {
  const {fetchTags} = useTags();
  const [income, setIncome] = useState<TagItem[]>([]);
  const [disburse, setDisburse] = useState<TagItem[]>([]);
  const [currentTag, setCurrentTag] = useState(0);
  useEffect(() => {
    setDisburse(fetchTags('-', value));
    setIncome(fetchTags('+', value));
  }, [value]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(show);
  }, [show]);
  return (
    <PopUpSelect close={close} show={visible} title='选择月份'>
      <Container>
        <ol>
          <li
            className={cn(currentTag === 0 ? 'selected' : '')} onClick={() => {
              setCurrentTag(0)
              onChange('全部信息')
            }}>全部类型
          </li>
        </ol>
        <p>支出</p>
        <ol>
          {income.map((tag: TagItem) => <li
            key={tag.id}
            className={cn(currentTag === tag.id ? 'selected' : '')}
            onClick={(e) => {
              setCurrentTag(tag.id);
              onChange((e.currentTarget as HTMLLIElement).textContent || '', tag.category);
            }}>{tag.text}</li>)}
        </ol>

        <p>收入</p>
        <ol>
          {disburse.map((tag: TagItem) => <li
            key={tag.id}
            className={cn(currentTag === tag.id ? 'selected' : '')}
            onClick={(e) => {
              setCurrentTag(tag.id);
              onChange((e.currentTarget as HTMLLIElement).textContent || '', tag.category);
            }}>{tag.text}</li>)}
        </ol>

      </Container>
    </PopUpSelect>
  );
};
export default PopUpTagBox;