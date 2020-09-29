import styled from 'styled-components';
import React, {FC, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../../../../style/animation.scss';
import cn from 'classnames';
import Cover from 'component/PopUp/popUpBoxComponent/popUpRootComponent/Cover'
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
  style?: {}
  className?: string
}

const PopUp: FC<Props> = ({show, children, style, className}) => {
  const [visible, setVisible] = useState(false);
  // const [_visible,_setVisible] = useState();
  useEffect(() => {
    setVisible(show);
    // _setVisible(true);
  }, [show]);
  return (
    <>
      <Cover show={visible}/>
      <CSSTransition classNames='popUp' className='popUp' timeout={300} unmountOnExit={true} in={visible}>
      <Wrapper>
          <Container className={cn(className)} style={style}>
            {children}
          </Container>
      </Wrapper>
    </CSSTransition>
    </>
  );
};

export default PopUp;