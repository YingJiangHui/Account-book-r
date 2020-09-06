import styled from 'styled-components';
import React, {FC, memo} from 'react';
import Icon from '../Icon';
import 'style/animation.scss'
import Tip from 'component/PopUp/Tip'
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
  onChange:(value:boolean)=>void
}
const Tooltip: FC<Props> =memo( ({value,onChange, inProp}) => {
  return (
      <Tip onChange={(value)=>onChange(value)} inProp={inProp} >
        <Wrapper>
          <Icon name='true2'/>
          {value}
        </Wrapper>
      </Tip>
  );
});
export default Tooltip;