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
import {useTags} from '../useTags';
const Options = styled.div`
  padding: 16px;
`;
const Wrapper = styled.div`
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
type Record={
  category: Category,
  tagIndex: number,
  amount: number,
  note: string
}

const KeepAccounts: FC<Props> = (props) => {
  const [visibleRemark, setVisibleRemark] = React.useState(false);
  const [visibleAddTag, setVisibleAddTag] = React.useState(false);

  const [record, setRecord] = React.useState<Record>({
    category: '-',
    tagIndex: 0,
    amount: 0,
    note: ''
  });
  const {getTags} = useTags()
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
      <Wrapper className={props.className}>
        <Options>
          <Close onClick={props.onClose}/>
          <SelectInfo
            value={record.category}
            onChange={(value:Category) => onChange({category: value})}
          />
          <Output
            onSubmit={onSubmit}
            onChange={(value: number) => {
              setOutput('');
              onChange({amount: value});
            }} value={output}/>

          <Tags
            value={getTags(record.category)}
            onClick={() => {
              props.onClose();
              setVisibleAddTag(true);
            }}
            className={record.category === '+' ? 'special' : 'base'}
            onChange={(value:number) => onChange({tagIndex: value})}
          />

          <OpenNotePanel
            onClick={() => {
              props.onClose();
              setVisibleRemark(true);
            }}
          >{record.note ? <><span>修改</span>：{record.note}</> : <span>添加备注</span>}</OpenNotePanel>
        </Options>

        <Pad
          className={record.category === '+' ? 'special' : 'base'}
          category={record.category}
          onChange={(value: string) => setOutput(value)}
        />

      </Wrapper>
      {visibleRemark ?
        <Note placeholder='请输入备注内容'
              title='请添加备注'
              maxLen={30}
              onChange={(value) => onChange({note: value})}
              onChangeClass={() => {
                setVisibleRemark(false);
                props.onOpen();
              }}
              value={record.note}
        />
        : ''}
      {visibleAddTag ?
        <Note title='请填写类别名'
              placeholder='不能重复添加类型名'
              maxLen={4}
              onChange={(value) => console.log(value)}
              onChangeClass={() => {
                setVisibleAddTag(false);
                props.onOpen();
              }}
              value=''
        />
        : ''}
    </Cover>
  );
};
export default KeepAccounts;