import {FC, memo} from 'react';
import Icon from 'component/common/Icon';
import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';

const Wrapper = styled.section`
  background: #fafafa;
  padding: 4px;
  button{
    float: left;
    width: 25%;
    height: 64px;
    font-size: 24px;
    font-weight: bold;background: #fff;
    border: 4px solid #fafafa;
    border-radius: 8px;
    >.icon{
      width: 35px;
      height: 35px;
    }
    
    &.ok{
      float: right;
      color: #fff;
      height: 192px;
    }
    
  
    &.base-ok{
      background: ${theme.themeColor};
    }
    &.special-ok{
       background: ${theme.special.themeColor};
    }
     &.base-disable-ok{
      background: ${theme.tingeColor};
    }
    &.special-disable-ok{
       background: ${theme.special.tingeColor};
    }
    &.zero{
      width: 50%;
    }
  }
`;
type Props = {
  onChange: (value: string) => void,
  category: string,
  className:string,
  value:number
}


const Pad: FC<Props> = memo((props) => {
  const onClick = (e: React.MouseEvent) => {
    const input = (e.target as HTMLButtonElement).textContent;
    if (input === null || input === undefined) return;
    props.onChange(input);
  };

  const [amount,setAmount ]= React.useState(props.value)
  React.useEffect(()=>{
    setAmount(props.value)
  },[props.value])

  let timer: number;
  const onTouchStart = () => {
    timer = setTimeout(() => {
      props.onChange('clear');
    }, 1000);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    props.onChange('removeOnly');
    clearTimeout(timer);
  };

  return (
    <Wrapper className='clearFix' onClick={onClick}>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button className='del' onClick={(e) => {e.stopPropagation();}} onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}><Icon name='delete'/></button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button className={`${props.className}-ok ok ${amount===0?props.className+'-disable-ok':''}`}>确定</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='zero'>0</button>
      <button>.</button>
    </Wrapper>

  );
});
export default Pad;