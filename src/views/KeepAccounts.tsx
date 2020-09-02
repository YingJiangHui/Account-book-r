import React, {FC, useCallback, useEffect} from 'react';
import {Wrapper, Options} from 'component/keepAccounts/style';
import 'index.scss';
import Close from 'component/accountsComponent/Close';
import Pad from 'component/accountsComponent/Pad';
import Output from 'component/accountsComponent/Output';
import Tags from 'component/accountsComponent/Tags';
import Note from 'component/accountsComponent/Note';
import SelectInfo from 'component/accountsComponent/SelectInfo';
import OpenNotePanel from 'component/accountsComponent/OpenNotePanel';
import Cover from 'component/Cover';
import {useTags} from '../hooks/useTags';
import useRecords from 'hooks/useRecords';
import dayjs from 'dayjs'

type Props = {
  className: string,
  onClose: () => void,
  onOpen: () => void
}
const recordData: RecordItem = {
  category: '-',
  tagIndex: 0,
  amount: 0,
  note: '',
  createAt: ''
};

const KeepAccounts: FC<Props> = (props) => {


  const {recordList, setRecordList, addRecord} = useRecords();
  const {fetchTags, tags, updateTags, removeTag, editTag, findTag} = useTags();
  const [visibleRemark, setVisibleRemark] = React.useState(false);
  const [visibleAddTag, setVisibleAddTag] = React.useState(false);

  const [updateTagId, setUpdateTagId] = React.useState(-1);

  const [record, setRecord] = React.useState<RecordItem>(recordData);

  const [output, setOutput] = React.useState<string>('');
  const onChange = useCallback((value: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...value
    });
  }, [record]);
  React.useEffect(() => {
    fetchTags(record.category);
  }, [record.category]);
  const onSubmit = () => {
    addRecord(record);
    setOutput('clear')
  };
  return (
    <Cover className={props.className}>
      {JSON.stringify(record)}
      <Wrapper className={props.className}>
        <Options>
          <Close onClick={props.onClose}/>
          <SelectInfo
            value={record.category}
            onChangeCategory={(value: Category) => onChange({category: value})}
            onChangeDate={(value: string) => {onChange({createAt: value});}}
          />
          <Output
            onSubmit={onSubmit}
            onChange={(value: number) => {
              setOutput('');
              onChange({amount: value});
            }} value={output}/>
          <Tags
            onRemoveTag={(id: number) => {removeTag(id);}}
            value={tags}
            onClick={(id: number | undefined) => {
              props.onClose();
              id ? setUpdateTagId(id) : setVisibleAddTag(true);
            }}
            className={record.category === '+' ? 'special' : 'base'}
            onChange={(value: number) => onChange({tagIndex: value})}
          />

          <OpenNotePanel
            onClick={() => {
              props.onClose();
              setVisibleRemark(true);
            }}
          >{record.note ? <><span>修改</span>：{record.note}</> : <span>添加备注</span>}</OpenNotePanel>
        </Options>

        <Pad
          value={record.amount}
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
              onChange={(value) => {updateTags(value, record.category);}}
              onChangeClass={() => {
                setVisibleAddTag(false);
                props.onOpen();
              }}
              value=''
        />
        : ''}
      {updateTagId > 0 ?
        <Note title='请填写类别名'
              placeholder='不能重复添加类型名'
              maxLen={4}
              onChange={(value) => {editTag(updateTagId, value);}}
              onChangeClass={() => {
                setUpdateTagId(-1);
                props.onOpen();
              }}
              value={findTag(updateTagId)?.text || ""}
        />
        : ''}
    </Cover>
  );
};
export default KeepAccounts;