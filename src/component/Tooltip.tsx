import styled from 'styled-components';
import {Transition} from 'react-transition-group';
import React, {FC, memo} from 'react';
import Icon from './Icon';

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
};
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: rgba(0,0,0,0.66);
  color: #fff;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  display: flex;justify-content: center;align-items: center;
  flex-direction: column;
  z-index: 99;
  .icon{
    fill:#fff;
    width: 34px;
    height: 34px;
    margin-bottom: 5px;
  }
`;
type Props = {
  inProp: boolean
  value: string
}
const Tooltip: FC<Props> =memo( ({value, inProp}) => {
  return (
    <div>
    <Transition unmountOnExit={true}  in={inProp} timeout={duration}>
      {(state: keyof typeof transitionStyles) => (
        <Wrapper style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <Icon name='true2'/>
          {value}
        </Wrapper>
      )}
    </Transition>
    </div>
  );
});
export default Tooltip;