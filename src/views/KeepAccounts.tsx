import React, {FC} from 'react';
import styled from 'styled-components';
import 'index.scss';
import Close from 'component/accountsComponent/Close';
import Pad from 'component/accountsComponent/Pad';
import Output from 'component/accountsComponent/Output';
import Tags from 'component/accountsComponent/Tags';
import Note from 'component/accountsComponent/Note';
import SelectInfo from 'component/accountsComponent/SelectInfo';
import OpenNotePanel from 'component/accountsComponent/OpenNotePanel';
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
  onClose: () => void,
  onOpen: () => void

}

const KeepAccounts: FC<Props> = (props) => {
  const [visibleNote, setVisibleNote] = React.useState(false);
  const [record, setRecord] = React.useState({
    category: '-',
    tagIndex: 0,
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
          <Close onClick={props.onClose}/>
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
            onClick={() => {props.onClose();setVisibleNote(true);}}
          >{record.note?<><span>修改</span>：{record.note}</>:<span>添加备注</span>}</OpenNotePanel>
        </Options>

        <Pad
          className={record.category === '+' ? 'special' : 'base'}
          category={record.category}
          onChange={(value: string) => setOutput(value)}
        />

      </RecordStyle>
      <Note onChange={(value) => onChange({note: value})}
            onChangeClass={() => {setVisibleNote(false);props.onOpen()}}
            value={record.note}
            className={visibleNote ? 'moveTo' : 'moveOut'}
      />
    </Cover>
  );
};
export default KeepAccounts;