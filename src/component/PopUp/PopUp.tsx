import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import 'animation.scss';
import cn from 'classnames';

const Wrapper = styled.div`
  
`;
const Container = styled.div`
  width: 100vw;
  background: #fff;
  border-radius: 12px 12px 0 0 ;
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: 0;
`;
type Props = {
  show: boolean
  style?: {}
  className?: string
}
const Caver = styled.div`
  background: rgba(0,0,0,0.111);
  width: 100vw;
  height: 100vh;
  z-index: 8;
`;
const PopUp: FC<Props> = ({show, children, style, className}) => {
  const [inPop, setInPop] = useState(false);

  useEffect(() => {
    setInPop(show);
  }, [show]);

  return (
    <CSSTransition classNames='popUp' className='popUp' timeout={300} unmountOnExit={true} in={inPop}>
      <Wrapper>
        <Caver />
        <Container className={cn(className)} style={style}>
            {children}
          </Container>
      </Wrapper>
    </CSSTransition>
  );
};

export default PopUp;