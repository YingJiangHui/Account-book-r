import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import 'style/animation.scss';

const Wrapper = styled.div`
background: rgba(0,0,0,0.4);
color: #fff;
padding: 6px 12px;
border-radius: 5px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);

`;

type Props = {
  text: string,
  show: boolean
}
const HintBox: FC<Props> = ({show, text}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(show);
    setTimeout(()=>setVisible(false),3000)
  }, [show]);
  return (
    <CSSTransition in={visible}  classNames={'fade'} timeout={200} unmountOnExit={true} className={'fade'}>
      <Wrapper>
        <span>{text}</span>
      </Wrapper>
    </CSSTransition>

  );
};

export default HintBox;