import React, {FC, memo, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import {useParams, HashRouter as router, useHistory} from "react-router-dom";
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
      <Tooltip value='改一笔' inProp={visibleTip}/>
      {visibleAlert ? <AlertSelectBox value='删除后无法恢复，是否删除' ensure={() => {
        history.goBack();
        removeRecord(id);
        setVisibleAlert(false);
      }}
                                      cancel={() => {setVisibleAlert(false);}}/> : ''}
      <KeepAccounts
        id={id}
        defaultRecord={record}
        ensure={() => {
          fetchRecord();
          setVisibleTip(true);
          setTimeout(() => {setVisibleTip(false);}, 2000);
        }}
        isVisible={(value: boolean) => {setVisibleAccounts(value);}}
        show={visibleAccounts}
      />
    </>
  );
});

export default RecordItem;