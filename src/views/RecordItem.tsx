import React, {FC, memo, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import {useParams, useHistory} from "react-router-dom";
import useRecords from 'hooks/useRecords';
import Icon from '../component/Icon';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs';
import KeepAccounts from 'views/KeepAccounts';
import Tooltip from 'component/PopUp/Tooltip';
import {Amount, Control, Info, TagIcon, View, Wrapper} from '../component/RecordItem/style';
import cn from 'classnames';
import AlertSelectBox from '../component/PopUp/AlertSelectBox';

const RecordItem: FC = memo(() => {
  const {findRecord, fetchRecord, removeRecord} = useRecords();
  const {findTag} = useTags();
  let {id} = useParams();
  id = parseInt(id);
  const recordItem = findRecord(parseInt(id));
  const [record, setRecord] = useState<RecordItem>(recordItem as RecordItem);
  const [tag, setTag] = useState<TagItem>({} as TagItem);
  const [visibleAlert, setVisibleAlert] = useState(false);
  useEffect(() => {
    if (recordItem) {
      setRecord(recordItem);
      setTag(findTag(recordItem.tagIndex)!);
    }
  }, [recordItem]);
  const [visibleTip, setVisibleTip] = useState(false);
  const [visibleAccounts, setVisibleAccounts] = useState(false);
  const history = useHistory();
  const [tipText, setTipText] = useState('');
  return (
    <>
      <Layout>
        <Wrapper>
          <View>
            <TagIcon>
              <Icon className={cn(record?.category === '+' ? 'special' : '')} name={tag?.icon}/><span>{tag?.text}</span>
            </TagIcon>
            <Amount>
              {(record?.category === "+" ? '+' : '-')}{record?.amount}
            </Amount>
            <Info>
              <li><span>记录时间</span>{dayjs(record?.createAt).format('YYYY年MM月DD日 HH:mm')}</li>
              <li><span>备注</span>{record?.note}</li>
            </Info>
          </View>
          <Control>
            <button onClick={() => setVisibleAlert(true)}>删除</button>
            <button onClick={() => setVisibleAccounts(true)}>编辑</button>
          </Control>
        </Wrapper>
      </Layout>
      <Tooltip onChange={(value: boolean) => setVisibleTip(value)} value={tipText} inProp={visibleTip}/>

        <AlertSelectBox
          value='删除后无法恢复，是否删除'
          show={visibleAlert}
          ensure={() => {
            setTipText('删一笔');
            setVisibleTip(true);
            removeRecord(id);
            setVisibleAlert(false);
            setTimeout(()=>{
              history.goBack();
            },500)
          }} cancel={() => {setVisibleAlert(false);}}/>

      <KeepAccounts
        id={id}
        defaultRecord={record}
        ensure={() => {
          fetchRecord();
          setTipText('改一笔');
          setVisibleTip(true);
        }}
        isVisible={(value: boolean) => {setVisibleAccounts(value);}}
        show={visibleAccounts}
      />
    </>
  );
});

export default RecordItem;