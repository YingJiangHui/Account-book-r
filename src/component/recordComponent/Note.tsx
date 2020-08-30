import {FC} from 'react';
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import theme from 'theme';
import Cover from '../Cover';

const Wrapper = styled.section`
  width: 100vw;
  background: #fff;
  border-radius: 10px 10px 0 0;
  padding: 16px;
  z-index: 6;
  position: fixed;
  left: 0;
  top: 100%;
  transition: transform .2s;
  &.moveTo{
    transform: translateY(-100%);
  }
  &.moveOut{
    transform: translateY(100%);
  }
  >.note-control{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >li{
        &:nth-child(1){
          width: 50px;
            >.icon{
              width: 20px;
              height: 30px;
              fill:${theme.tingeFontColor};
            }
         }
        &:nth-child(3){
            width: 50px;
           color: ${theme.themeColor};
        }
      }
    }
  >input[type=text]{
    font-size: 17px;
    width: 100%;
    margin-top: 20px;
    height: 48px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  >.notes{
    margin-top: 20px;
    margin-bottom: 50px;
    >li{            
      background:#f1f1f1;
      color: #a9a9a9;
      font-size: 14px;
      font-weight: 100;
      border-radius: 25px;
      display: inline-block;
      padding: 5px 10px;
      margin-right:10px ;
      &.selected{
        background: ${theme.tingeColor};
        color: ${theme.themeColor};
        box-shadow: 0 0 2px ${theme.themeColor};
      }
    }
  }
`;
type Props = {
  value: string,
  className: string,
  onChange:(value:string)=>void
  onChangeClass:()=>void
}
const Note: FC<Props> = (props) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  const onEnsure=()=>{
    props.onChange(refInput.current?.value||'');
    props.onChangeClass()
  }
  React.useEffect(()=>{
    if(props.className==='moveTo'){
      refInput.current?.focus()
    }
  },[props.className])
  return (
    <Cover className={props.className}>
      <Wrapper className={props.className}>
        <ol className='note-control'>
          <li onClick={props.onChangeClass}><Icon name='left'/></li>
          <li>请添加备注</li>
          <li onClick={onEnsure}>确定</li>
        </ol>
        <input ref={refInput}  defaultValue={props.value} type="text" placeholder='请输入备注内容'/>
        <ol className='notes'>
          <li>dd</li>
        </ol>
      </Wrapper>
    </Cover>
  );
};
export default Note;