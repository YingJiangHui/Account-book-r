import styled from 'styled-components';
import React, {FC} from 'react';
import Icon from 'component/Icon';

const Wrapper = styled.button`
  background: #fff;
  border: none;
  .icon{
  width: 17px;
  height: 17px;
  fill:#b2b2b2;
  }
`;
type Props={
  onClick:()=>void
}
const Close:FC<Props> =(props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <Icon name='close'/>
    </Wrapper>
  );
};

export default Close;