import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../../../../style/animation.scss';
import cn from 'classnames';
import Cover from 'component/PopUp/popUpBoxComponent/popUpRootComponent/Cover';

const Wrapper = styled.div`
  
`;
const Container = styled.div`
  width: 100vw;
  background: #fff;
  border-radius: 12px 12px 0 0 ;
  z-index: 8;
  position: absolute;
  bottom: 0;
  left: 0;
`;
type Props = {
  show: boolean
  isVisible: (isVisible: boolean) => void
  style?: {}
  className?: string
}

const PopUp: FC<Props> = ({show, children, style, className, isVisible}) => {
  const [visible, setVisible] = useState(false);
  let startY = 0;
  useEffect(() => {
    setVisible(show);
  }, [show]);
  const touchStart = (e: React.TouchEvent) => {
    startY = e.targetTouches[0].clientY;
  };
  const touchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 100) {
      isVisible && isVisible(false);
    }
  };
  return (
    <div onTouchStart={(e: React.TouchEvent) => {touchStart(e);}}
         onTouchEnd={(e: React.TouchEvent) => {touchEnd(e);}}>
      <Cover show={visible} onClick={() => {isVisible && isVisible(false);}}/>
      <CSSTransition classNames='popUp' className='popUp' timeout={250} unmountOnExit={true} in={visible}>
        <Wrapper

        >
          <Container className={cn(className)} style={style}>
            {children}
          </Container>
        </Wrapper>
      </CSSTransition>
    </div>
  );
};

export default PopUp;