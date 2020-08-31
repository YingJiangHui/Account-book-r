import React, {FC} from 'react';
import styled from 'styled-components';
import 'index.scss';
import Close from 'component/recordComponent/Close';
import Pad from '../component/recordComponent/Pad';
import Output from '../component/recordComponent/Output';
import Tags from '../component/recordComponent/Tags';
import Note from '../component/recordComponent/Note';
import SelectInfo from '../component/recordComponent/SelectInfo';
import OpenNotePanel from '../component/recordComponent/OpenNotePanel';
import Cover from 'component/Cover';

const Options = styled.div`
  padding: 16px;
`;


const RecordStyle = styled.div`
  z-index: 1;
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
  const [visibleNote, setVisibleNote] = React.useState(false);
  const [record, setRecord] = React.useState({
    category: '-',
    tagIndex: 0,
    amount: 0,
    note: ''
  });
  type keys = keyof typeof record;
  const [output, setOutput] = React.useState<string>('');
  const onChange = (value: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...value
    });
  };
  const onSubmit = () => {
    const StorageRecordName = 'recordTable';
    const recordTable = JSON.parse(localStorage.getItem(StorageRecordName) || '[]');
    recordTable.push(record);
    localStorage.setItem(StorageRecordName, JSON.stringify(recordTable));
  };
  return (
    <Cover className={props.className}>
      <RecordStyle className={props.className}>

        <Options>
          <Close onClick={props.onChange}/>
          <SelectInfo
            value={record.category}
            onChange={(value) => onChange({category: value})}
          />

          <Output
            onSubmit={onSubmit}
            onChange={(value: number) => {
              setOutput('');
              onChange({amount: value});
            }} value={output}/>

          <Tags
            className={record.category === '+' ? 'special' : 'base'}
            category={record.category}
            onChange={(value) => onChange({tagIndex: value})}
          />

          <OpenNotePanel
            onClick={() => {setVisibleNote(true);}}
          >{record.note?<><span>修改</span>：{record.note}</>:<span>添加备注</span>}</OpenNotePanel>

          <Note onChange={(value) => onChange({note: value})}
                onChangeClass={() => setVisibleNote(false)}
                value={record.note}
                className={visibleNote ? 'moveTo' : 'moveOut'}
          />
        </Options>

        <Pad
          className={record.category === '+' ? 'special' : 'base'}
          category={record.category}
          onChange={(value: string) => setOutput(value)}
        />
      </RecordStyle>
    </Cover>
  );
};
export default Record;