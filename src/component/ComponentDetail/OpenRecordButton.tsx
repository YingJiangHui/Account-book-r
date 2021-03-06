import React, {memo} from 'react';
import styled from 'styled-components';
import Icon from '../common/Icon';
import theme from 'theme';

const RecordButton = styled.div`
   box-shadow: 0 0 4px rgba(0,0,0,0.33);
   position: absolute;
   right: 8%;
   bottom: 20%;
   background: #fff;
   border-radius: 50%;
   padding: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
  .icon{
    fill:${theme.themeColor};
      width: 34px;
      height: 34px;

  }
`;

const OpenRecordButton =memo( (props:any) => {
  return (
    <RecordButton onClick={props.onClick}>
      <Icon name='record1'/>
    </RecordButton>
  );
});
export default OpenRecordButton;