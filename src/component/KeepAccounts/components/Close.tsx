import styled from 'styled-components';
import React, {FC, memo} from 'react';
import Icon from 'component/common/Icon';
import theme from 'theme';

const Wrapper = styled.button`
  background: #fff;
  border: none;
  .icon{
  width: 24px;
  height: 24px;
  fill:${theme.tingeFontColor};
  }
`;
type Props={
  onClick:()=>void
}
const Close:FC<Props> =memo((props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <Icon name='close'/>
    </Wrapper>
  );
});

export default Close;