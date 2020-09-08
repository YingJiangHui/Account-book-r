import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import Layout from '../component/common/Layout';
import OpenRecordButton from '../component/ComponentDetail/OpenRecordButton';
import KeepAccounts from 'component/KeepAccounts/KeepAccounts';
import Records from 'component/ComponentDetail/Records';
import {Header, Wrapper} from 'component/ComponentDetail/style';
import useRecords from 'hooks/useRecords';
import Tooltip from '../component/PopUp/Tooltip';
import dayjs from 'dayjs';
import PopUpMonthBox from '../component/PopUp/PopUpMonthBox';
import PopUpTagBox from '../component/PopUp/PopUpTagBox';
import {useTags} from '../hooks/useTags';
import 'style/animation.scss';
import NotData from '../component/common/NotData';
import monetaryUnit from 'lib/monetaryUnitFormat'
const nowMonth = dayjs(new Date()).format('YYYY年MM月');
const Detail: FC = memo(() => {
  const {tags, findId} = useTags();
  const [visibleAccounts, setVisibleAccounts] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);
  const [visibleTip, setVisibleTip] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);
  const [tagName, setTagName] = useState('全部类型');
  const {filterRecordUsedMonth, recordList, fetchRecord, filterRecordUsedTag, totalAmount} = useRecords();
  const [appearMonth, setAppearMonth] = useState(nowMonth);
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [tagId, setTagId] = useState<number>(0);
  const [recordGroup, setRecordGroup] = useState<any[]>([]);

  useEffect(() => {
    const newRecords = filterRecordUsedMonth(appearMonth);
    setRecord(() => newRecords);
    // 0表示显示全部
    if (tagId !== 0) {
      setRecord(() => filterRecordUsedTag(tagId, newRecords));
    }
  }, [recordList, appearMonth, tagId]);

  useEffect(() => {
    setRecordGroup(records());
  }, [record]);

  const records = useCallback(() => {
    const hash:{[k:string]:RecordItem[]} = {}
    record.map(item=>{
      const key = dayjs(item.createAt).format('YYYY-MM-DD')
     if(key in hash){
       hash[key] = [...hash[key],item]
     } else{
       hash[key] = [item]
     }
    })
    return Object.entries(hash)
  }, [record]);

  return (
    <>
      <Tooltip onChange={(value:boolean)=>setVisibleTip(value)} value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button onClick={() => {setVisibleTag(true);}}>{tagName}</button>
          <ol>
            <li onClick={() => {setVisibleMonth(true);}}>{appearMonth}</li>
            <li>总支出￥{monetaryUnit(totalAmount(record, '-'),true)}</li>
            <li>总收入￥{monetaryUnit(totalAmount(record, '+'),true)}</li>
          </ol>
        </Header>
        <Wrapper>
          {recordGroup.length===0?<NotData text={'暂无记录...'}/>:recordGroup.map(([date,records])=>
            <Records records={records} key={date}/>
          )}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisibleAccounts(true)}/>

      <KeepAccounts
        ensure={() => {
          fetchRecord();
          setVisibleTip(true);
        }}
        isVisible={(value: boolean) => {setVisibleAccounts(value);}}
        show={visibleAccounts}
      />
      <PopUpMonthBox
        show={visibleMonth}
        close={() => setVisibleMonth(false)}
        onChange={(value: dayjs.Dayjs) => {
          setAppearMonth(value.format('YYYY年MM月'));
          setVisibleMonth(false);
        }}
      />
      <PopUpTagBox
        value={tags} show={visibleTag} close={() => setVisibleTag(false)}
        onChange={(value: string, category: Category | undefined) => {
          setTagName(value);
          setVisibleTag(false);
          if (category)
            setTagId(findId(value, category)!.id);
          else
            setTagId(0);
        }}/>
    </>
  );

});

export default Detail;