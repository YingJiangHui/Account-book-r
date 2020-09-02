import {FC, memo} from 'react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
margin-top: 20px;

  button{
      background: transparent;
      border: none;
  >span{
      color: #4c5d7f;
    }
  }
`;
type Props={
  onClick:()=>void
}
const OpenNotePanel: FC<Props> =memo( (props) => {
  return (
    <Wrapper>
      <button onClick={props.onClick}>{props.children}</button>
    </Wrapper>
  );
});
export default OpenNotePanel;