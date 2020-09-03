import React, {FC, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import OpenRecordButton from '../component/OpenRecordButton';
import KeepAccounts from 'views/KeepAccounts';
import Records from 'component/Records';
import {Header, Wrapper} from 'component/Detail/style';
import useRecords from 'hooks/useRecords';
import Tooltip from '../component/Tooltip';
import dayjs from 'dayjs';
import PopUpMonthBox from '../component/PopUpMonthBox';
import PopUpTagBox from '../component/PopUp/PopUpTagBox';
import {useTags} from '../hooks/useTags';


const nowMonth = dayjs(new Date()).format('MM月');
const Detail: FC = () => {
  const {tags, findId} = useTags();

  const [visibleAccounts, setVisibleAccounts] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);
  const [visibleTip, setVisibleTip] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);

  const {filterRecordUsedMonth, recordList, fetchRecord, filterRecordUsedTag} = useRecords();
  const [appearMonth, setAppearMonth] = useState(nowMonth);
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [tagId, setTagId] = useState<number>(0);
  useEffect(() => {
    const newRecords = filterRecordUsedMonth(appearMonth);
    setRecord(() => newRecords);
    // 0表示显示全部
    if (tagId !== 0) {
      setRecord(() => filterRecordUsedTag(tagId, newRecords));
    }
  }, [recordList, appearMonth, tagId]);


  return (
    <>
      <Tooltip value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button onClick={() => {setVisibleTag(true);}}>全部类型</button>
          <ol>
            <li onClick={() => {setVisibleMonth(true);}}>{appearMonth}</li>
            <li>总支出￥100.00</li>
            <li>总收入￥100.00</li>
          </ol>
        </Header>
        <Wrapper>
          {record.map((record, index) => <Records key={index} recordItem={record}/>)}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisibleAccounts(true)}/>
      <KeepAccounts
        ensure={() => {
          fetchRecord();
          setVisibleTip(true);
          setTimeout(() => {setVisibleTip(false);}, 2000);
        }}
        onOpen={() => {setVisibleAccounts(true);}}
        onClose={() => {setVisibleAccounts(false);}}
        className={visibleAccounts ? 'moveTo' : 'moveOut'}
      />
      <PopUpMonthBox
        show={visibleMonth}
        close={() => setVisibleMonth(false)}
        onChange={(value: string) => {
          setAppearMonth(value);
          setVisibleMonth(false);
        }}
      />
      <PopUpTagBox
        value={tags} show={visibleTag} close={() => setVisibleTag(false)}
        onChange={(value: string, category: Category | undefined) => {
          setVisibleTag(false);
          if (category)
            setTagId(findId(value, category)!.id);
          else
            setTagId(0);
        }}/>
    </>
  );

};

export default Detail;