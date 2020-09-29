import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import Cover from '../popUpBoxComponent/popUpRootComponent/Cover';
import {CSSTransition} from 'react-transition-group';
import HintBox from '../HintBox';
import 'style/animation.scss';


const Wrapper = styled.div`
  background: #fff;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
`;
const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  width: 100%;
  padding: 60px 0;
`;
const Control = styled.div`
  height: 30%;
  >button{

    background: transparent;
    width: 50%;    
    padding: 20px 0;
    border: none;
        border-right: 1px solid rgba(0,0,0,0.1);
   &:last-child{
        color: #db4460;
        border-right:none;
  }
  }
`;
type Props = {
  value: string
  ensure: () => void
  cancel: () => void
  show: boolean
  beforeTip?: string
}
const AlertSelectBox: FC<Props> = memo(({value, children, ensure, cancel, show, beforeTip}) => {
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  useEffect(() => {
    setVisible(show);
    }, [show]);
  useEffect(()=>{
    console.log(hintVisible)
  },[hintVisible])
  return (
    <>
      <Cover show={visible}/>
      <CSSTransition timeout={250} classNames={'fade'} className={'fade'} in={visible} unmountOnExit={true}>
        <Wrapper>
          <View>{value}</View>
          <Control>
            <button onClick={() => {
              cancel();
            }}>取消
            </button>
            <button onClick={
              () => {
                ensure();
                setHintVisible(true);
              }}>确定
            </button>

          </Control>
        </Wrapper>
      </CSSTransition>
      {beforeTip ?
        <HintBox text={beforeTip} show={hintVisible} onChange={(value: boolean) => {setHintVisible(value);}}/>
        : ''}

    </>
  );
});

export default AlertSelectBox;