import PopUpNoSure from 'component/PopUp/popUpBoxComponent/PopUpNoSure';
import React, {FC, memo, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import cn from 'classnames';
import Context from 'contexts/context'
const Container = styled.main`
  max-height: 500px;
  overflow: auto;
  padding:  16px;
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
const PopUpTagBox: FC<Props> = memo(({close, show, value, onChange}) => {
  const {categoryTags} = useContext(Context)
  const [currentTag, setCurrentTag] = useState(0);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(show);
  }, [show]);
  return (
    <PopUpNoSure close={close} show={visible} title='选择类型'>
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
          {categoryTags['-'].map((tag: TagItem) => <li
            key={tag.id}
            className={cn(currentTag === tag.id ? 'selected' : '')}
            onClick={(e) => {
              setCurrentTag(tag.id);
              onChange((e.currentTarget as HTMLLIElement).textContent || '', tag.category);
            }}>{tag.text}</li>)}
        </ol>

        <p>收入</p>
        <ol>
          {categoryTags['+'].map((tag: TagItem) => <li
            key={tag.id}
            className={cn(currentTag === tag.id ? 'selected' : '')}
            onClick={(e) => {
              setCurrentTag(tag.id);
              onChange((e.currentTarget as HTMLLIElement).textContent || '', tag.category);
            }}>{tag.text}</li>)}
        </ol>

      </Container>
    </PopUpNoSure>
  );
});
export default PopUpTagBox;