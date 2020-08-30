import React from 'react';
import styled from 'styled-components';
import 'index.scss';
import Close from 'component/recordComponent/Close';
import Pad from '../component/recordComponent/Pad';
import Output from '../component/recordComponent/Output';
import Tags from '../component/recordComponent/Tags';
import Notes from '../component/recordComponent/Notes';
import SelectInfo from '../component/recordComponent/SelectInfo';

const Options = styled.div`
  padding: 16px;
`;

const Cover = styled.div`
  &.moveTo{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;left: 0;
    background: rgba(0,0,0,.05);
  }
`;
const RecordStyle = styled.div`
  z-index: 9;
  width: 100vw;
  transition: .3s;
  top:100%;
  left: 0;
  border-radius: 10px 10px 0 0;
  background: #fff;
  position: fixed;
  &.moveTo{
      transform: translateY(-100%);
  }
  &.moveOut{
      transform: translateY(100%);
  }
`;
const Record = (props: any) => {
  return (
    <Cover className={props.className}>
      <RecordStyle className={props.className}>
        <Options>
          <Close/>
          <SelectInfo/>
          <Output/>
          <Tags/>
          <Notes/>
        </Options>
        <Pad/>
      </RecordStyle>
    </Cover>
  );
};
export default Record;