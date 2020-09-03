import React, {FC, useState} from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import Cover from './Cover';
import ReactCSSTransitionGroup,{CSSTransition} from 'react-transition-group'; // ES6
import 'animation.scss'
import theme from '../theme';
const Wrapper = styled.div`
  width: 100vw;
  background: #fafafa;
  border-radius: 10px 10px 0 0;

  z-index:9;
`
const Control = styled.ol` 
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
   .icon{
        fill:${theme.tingeFontColor};
        width: 25px;
        height: 25px;
      }
  >li{
    &:nth-child(2){
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50% ,-50%);
   
    }
  }
`;
const List = styled.ol`
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  >li{ 
  font-size: 18px;
  border: 4px solid #fafafa;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 25%;
  }
`;

type Props = {
  title: string,
}
const PopUpSelect: FC<Props> = ({title}) => {
  const [inProp, setInProp] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setInProp(true)}>
        Click to Enter
      </button>
      <button type="button" onClick={() => setInProp(false)}>
        Click to Exit
      </button>
      <CSSTransition classNames='move' className='defaultPos' timeout={300} unmountOnExit={true} in={inProp}>
        <Cover className=''>
        <Wrapper>
          <Control>
            <li><Icon name='close'/></li>
            <li>{title}</li>
          </Control>
          <List>
            <li>123</li>

            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </List>

        </Wrapper>
        </Cover>
      </CSSTransition>
      </>
  );
};
export default PopUpSelect;