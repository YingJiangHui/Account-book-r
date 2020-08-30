import React, {FC} from 'react';
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
type Props = {
  className: string,
  onChange: () => void
}

const Record: FC<Props> = (props) => {
  const [record, setRecord] = React.useState({
    category: '-',
    tags: '',
    amount: 0,
    note: ''
  });
  const [output, setOutput] = React.useState<string>('');
  const onChange = (value: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...value
    });
  };
  return (
    <Cover className={props.className}>
      <RecordStyle className={props.className}>
        <Options>
          <Close onClick={props.onChange}/>
          <SelectInfo/>
          <Output onChange={(value: number) => {
            setOutput('');
            onChange({amount: value});
          }} value={output}/>
          <Tags/>
          <Notes/>
        </Options>
        <Pad onChange={(value: string) => setOutput(value)}/>
      </RecordStyle>
    </Cover>
  );
};
export default Record;