import styled from 'styled-components';
import React, {FC} from 'react';
import Icon from 'component/Icon';
import theme from 'theme';

const Wrapper = styled.button`
  background: #fff;
  border: none;
  .icon{
  width: 17px;
  height: 17px;
  fill:${theme.tingeFontColor};
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