import {FC} from 'react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
margin-top: 20px;
  button{
    color: #4c5d7f;
    background: transparent;
    border: none;
  }
`;
type Props={
  onClick:()=>void
}
const OpenNotePanel: FC<Props> = (props) => {
  return (
    <Wrapper>
      <button onClick={props.onClick}>添加备注</button>
    </Wrapper>
  );
};
export default OpenNotePanel;