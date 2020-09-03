import React, {FC, useCallback, useEffect, useState} from 'react';
import {Wrapper, Options} from 'component/keepAccounts/style';
import 'index.scss';
import Close from 'component/accountsComponent/Close';
import Pad from 'component/accountsComponent/Pad';
import Output from 'component/accountsComponent/Output';
import Tags from 'component/accountsComponent/Tags';
import PopUpInput from 'component/PopUp/PopUpInput';
import SelectInfo from 'component/accountsComponent/SelectInfo';
import OpenNotePanel from 'component/accountsComponent/OpenNotePanel';
import Cover from 'component/Cover';
import {useTags} from '../hooks/useTags';
import useRecords from 'hooks/useRecords';

type Props = {
  className: string,
  onClose: () => void,
  onOpen: () => void,
  ensure: () => void,
}
const recordData: RecordItem = {
  category: '-',
  tagIndex: 0,
  amount: 0,
  note: '',
  createAt: ''
};

const KeepAccounts: FC<Props> = (props) => {

  const {addRecord,filterRecordUsedTag} = useRecords();
  const {fetchTags, tags, updateTags, removeTag, editTag, findTag} = useTags();

  const [visibleRemark, setVisibleRemark] = useState(false);
  const [visibleAddTag, setVisibleAddTag] = useState(false);
  const [updateTagId, setUpdateTagId] = useState(-1);

  const [record, setRecord] = useState<RecordItem>(recordData);

  const [tagList,setTagList] = useState<TagItem[]>([])

  useEffect(()=>{
    setTagList(fetchTags(record.category))
    console.log('fuck')
  },[record.category,props.onOpen])

  const [output, setOutput] = useState<string>('');
  const onChange = useCallback((value: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...value
    });
  }, [record]);
  const onSubmit = () => {
    addRecord(record);
    setOutput('clear');
    props.onClose();
    props.ensure();
  };
  return (
    <Cover>
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
            value={tagList}
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

      <PopUpInput
        close={() => {
          setVisibleRemark(false);
          props.onOpen();
        }}
        show={visibleRemark}
        placeholder='请输入备注内容'
        title='请添加备注'
        maxLen={30}
        onChange={(value) => onChange({note: value})}
        value={record.note}
      />
      <PopUpInput
        show={visibleAddTag}
        title='请填写类别名'
        placeholder='不能重复添加类型名'
        maxLen={4}
        onChange={(value) => {updateTags(value, record.category);}}
        close={() => {
          setVisibleAddTag(false);
          props.onOpen();
        }}
        value=''
      />
      <PopUpInput
        show={updateTagId>0}
        title='请填写类别名'
        placeholder='不能重复添加类型名'
        maxLen={4}
        onChange={(value) => {editTag(updateTagId, value);}}
        close={() => {
          setUpdateTagId(-1);
          props.onOpen();
        }}
        value={findTag(updateTagId)?.text || ""}
      />
    </Cover>
  );
};
export default KeepAccounts;