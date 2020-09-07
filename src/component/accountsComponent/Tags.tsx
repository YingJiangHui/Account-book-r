import {FC, memo, useEffect, useState} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import PopOptionBox from '../PopUp/PopOptionBox';
import useUpdate from 'hooks/useUpdate';

const Wrapper = styled.section`
  .view{
    padding-bottom: 10px;
    width: 100%;
    overflow: scroll;
    >ol{
    display: flex;
    height: 100px;
    >li{
    .icon{
      transition: .3s;
    }
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
      display: flex;
      flex-direction: column;
      position: relative;
      user-select:none; //文字不会被选中
      height: inherit;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      font-weight: 100;
      color: #7c7c7c;
      min-width: 16.666%;
      .icon{
        margin-bottom: 10px;
        height: 40px;
        width: 40px;
        background: #ececec;
        border-radius: 50%;
        padding: 10px;
        fill:#c7c7c7;
      }
    }
  }
  }
`;


type Props = {
  onRemoveTag: (id: number) => void,
  onChange: (value: number) => void,
  className: string,
  onClick: (id?: number) => void,
  value: TagItem[]
  index: number
}
const Tags: FC<Props> = memo((props) => {
  const {value, index: defaultIndex, className} = props;
  const [tags, setTags] = useState<TagItem[]>([]);
  const [index, setIndex] = useState(1);

  const toggle = (i: number) => {
    setIndex(i);
  };
  useEffect(() => {
    setIndex(defaultIndex);
  }, []);
  useEffect(() => {
    setTags(value);
  }, [value]);

  useUpdate(() => {
    console.log('fuck')
  }, [tags]);
  useEffect(() => {
    props.onChange(index);
  }, [index]);

  let timer = -1;
  const [visiblePop, setVisiblePop] = React.useState(-1);
  if (visiblePop)
    document.addEventListener('click', () => {setVisiblePop(-1);}, {once: true});

  return (
    <Wrapper>
      <div className="view">
        <ol>
          {tags.map((item: TagItem) =>
            <li
              onTouchStart={
                (e: React.TouchEvent) => {
                  timer = setTimeout(() => setVisiblePop(item.id), 1000);
                }
              }
              onTouchEnd={
                (e) => {
                  e.stopPropagation();
                  clearTimeout(timer);
                }
              }
              onClick={(e) => {
                toggle(item.id);
              }}
              className={index === item.id ? props.className + '-selected' : ''}
              key={item.id}>

              <Icon name={item.icon}/>
              {
                visiblePop === item.id ? <PopOptionBox x={() => {
                  props.onClick(item.id);
                }} y={() => {
                  if (window.confirm('是否删除')) {
                    props.onRemoveTag(item.id);
                  }
                }}/> : ''
              }
              {item.text}</li>)}
          <li onClick={() => props.onClick()}><Icon name='add'/>添加</li>
        </ol>
      </div>

    </Wrapper>
  );
});
export default Tags;