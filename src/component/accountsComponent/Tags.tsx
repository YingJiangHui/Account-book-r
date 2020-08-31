import {FC, useState} from 'react';
import Icon from 'component/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
const Wrapper = styled.section`
  .view{
    padding-bottom: 10px;
    width: 100%;
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


type Props = {
  onChange: (value: number) => void,
  className: string,
  onClick:()=>void,
  value:TagItem[]
}
const Tags: FC<Props> = (props) => {
  const [tags, setTags] = useState<TagItem[]>(props.value);
  React.useEffect(()=>{
    setTags(props.value)
  },[props.value])
  const [index, setIndex] = useState(1);
  const toggle = (i: number) => {
    setIndex(i);
  };
  React.useEffect(()=>{
    setIndex(tags[0].id)
  },[tags])
  React.useEffect(() => {
    props.onChange(index);
  }, [index]);
  return (
    <Wrapper>
      <div className="view">
        <ol>
          {tags.map((item: TagItem) =>
            <li
              onClick={() => toggle(item.id)}
              className={index === item.id ? props.className + '-selected' : ''}
              key={item.id}>
              <Icon name={item.icon}/>
              {item.text}</li>)}
            <li onClick={props.onClick}><Icon name='add'/>添加</li>
        </ol>
      </div>

    </Wrapper>
  );
};
export default Tags;