import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import 'style/index.scss';
import Close from 'component/KeepAccounts/components/Close';
import Pad from 'component/KeepAccounts/components/Pad';
import Output from 'component/KeepAccounts/components/Output';
import Tags from 'component/KeepAccounts/components/Tags';
import PopUpInput from 'component/PopUp/PopUpInput';
import SelectInfo from 'component/KeepAccounts/components/SelectInfo';
import OpenNotePanel from 'component/KeepAccounts/components/OpenNotePanel';
import {useTags} from 'hooks/useTags';
import useRecords from 'hooks/useRecords';
import PopUp from 'component/PopUp/popUpBoxComponent/popUpRootComponent/PopUp';
import styled from 'styled-components';

const Options = styled.div`
  padding: 16px 16px 0 16px;
`;

type Props = {
  id?: number
  defaultRecord?: RecordItem
  isVisible: (value: boolean) => void
  ensure: (record:RecordItem,id?:number) => void
  show: boolean
}

let recordData: RecordItem = {
  id: 0,
  category: '-',
  tagIndex: 1,
  amount: 0,
  note: '',
  createAt: ''
};

const KeepAccounts: FC<Props> = memo((props) => {
  const {show, ensure, isVisible, defaultRecord, id} = props;
  const {fetchTags, tags, updateTags, removeTag, editTag, findTag} = useTags();
  const [visibleRemark, setVisibleRemark] = useState(false);
  const [visibleAddTag, setVisibleAddTag] = useState(false);
  const [updateTagId, setUpdateTagId] = useState(-1);
  const [record, setRecord] = useState<RecordItem>(recordData);
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const [visibleThis, setVisibleThis] = useState(false);

  useEffect(() => {
    setTagList(fetchTags(record.category));
  }, [record.category,show, tags]);

  const [output, setOutput] = useState<string>('');

  const onChange = useCallback((value: Partial<typeof record>) => {
    setRecord({
      ...record,
      ...value
    });
  }, [record]);

  const onSubmit = () => {
    if (id)
      ensure(record, id);
    else{
      ensure(record);
      setTimeout(()=>setOutput('clear'),310)
    }
    isVisible(false);
  };

  useEffect(() => {
    setVisibleThis(show);
  }, [show, defaultRecord]);
  useEffect(() => {
    if (defaultRecord)
      setRecord(defaultRecord);
  }, [defaultRecord]);

  return (
    <>
      <PopUp show={visibleThis}>
        <Options>
          <Close onClick={() => isVisible(false)}/>
          <SelectInfo
            category={record.category}
            defaultDate={record.createAt}
            onChangeCategory={(value: Category) => onChange({category: value})}
            onChangeDate={(value: string) => {onChange({createAt: value});}}
          />
          <Output
            defaultValue={record.amount.toString()}
            onSubmit={onSubmit}
            onChange={(value: number) => {
              setOutput('');
              onChange({amount: value});
            }}
            value={output}/>
          <Tags
            onRemoveTag={(id: number) => {removeTag(id);}}
            value={tagList}
            onClick={(id: number | undefined) => {
              props.isVisible(false);
              id ? setUpdateTagId(id) : setVisibleAddTag(true);
            }}
            index={record.tagIndex}
            className={record.category === '+' ? 'special' : 'base'}
            onChange={(value: number) => onChange({tagIndex: value})}
          />

          <OpenNotePanel
            onClick={() => {
              props.isVisible(false);
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
      </PopUp>

      <PopUpInput
        close={() => {
          setVisibleRemark(false);
          props.isVisible(true);
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
          props.isVisible(true);
        }}
        value=''
      />
      <PopUpInput
        show={updateTagId > 0}
        title='请填写类别名'
        placeholder='不能重复添加类型名'
        maxLen={4}
        onChange={(value) => {editTag(updateTagId, value);}}
        close={() => {
          setUpdateTagId(-1);
          props.isVisible(true);
        }}
        value={findTag(updateTagId)?.text || ""}
      />
    </>
  );
});
export default KeepAccounts;