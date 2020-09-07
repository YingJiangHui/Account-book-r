import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import Cover from './popUpRootComponent/Cover';
import {CSSTransition} from 'react-transition-group';
import HintBox from './HintBox';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  height: 220px;
`;
const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  width: 100%;
  height: 70%;
`;
const Control = styled.div`
  height: 30%;
  >button{

    background: transparent;
    width: 50%;    
    height: 100%;
    border: none;
        border-right: 1px solid rgba(0,0,0,0.1);
   &:last-child{
        border-right:none;
  }
  }
`;
type Props = {
  value: string
  ensure: () => void
  cancel: () => void
  show: boolean
  beforeTip?:string
}
const AlertSelectBox: FC<Props> = memo(({value, children, ensure, cancel, show,beforeTip}) => {
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);
  return (
    <>
    <CSSTransition timeout={200} classNames={'fade'} in={visible} unmountOnExit={true}>
      <Cover>
        <Wrapper>
          <View>{value}</View>
          <Control>
            <button onClick={
              () => {
                ensure();
                setHintVisible(true)
              }}>确定
            </button>
            <button onClick={() => {
              cancel();
            }}>取消
            </button>
          </Control>
        </Wrapper>
      </Cover>
    </CSSTransition>
      {beforeTip?
        <HintBox text={beforeTip} show={hintVisible} onChange={(value:boolean)=>{setHintVisible(value)}}/>
      :''}

      </>
  );
});

export default AlertSelectBox;