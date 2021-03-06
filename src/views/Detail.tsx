import React, {FC, memo, useContext, useEffect, useState} from 'react';
import Layout from '../component/common/Layout';
import OpenRecordButton from '../component/ComponentDetail/OpenRecordButton';
import KeepAccounts from 'component/KeepAccounts/KeepAccounts';
import Records from 'component/ComponentDetail/Records';
import {Header, Wrapper} from 'component/ComponentDetail/style';
import Tooltip from '../component/PopUp/Tooltip';
import dayjs from 'dayjs';
import PopUpMonthBox from '../component/PopUp/PopUpMonthBox';
import PopUpTagBox from '../component/PopUp/PopUpTagBox';
import 'style/animation.scss';
import NotData from '../component/common/NotData';
import monetaryUnit from 'lib/monetaryUnitFormat';


import Context from 'contexts/context';


const nowMonth = dayjs(new Date()).format('YYYY年MM月');
const Detail: FC = memo(() => {

  const {tags, findTagUseText, createRecord, deleteRecord, getAmount, records, categoryRecords, filterDateRecord, filterTagRecord} = useContext(Context);

  const [visibleAccounts, setVisibleAccounts] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);
  const [visibleTip, setVisibleTip] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);

  const [tagName, setTagName] = useState('全部类型');
  const [appearMonth, setAppearMonth] = useState(nowMonth);
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const [tagId, setTagId] = useState<number>(0);
  const [recordGroup, setRecordGroup] = useState<any[][]>([]);

  const [amount, setAmount] = useState({'+': 0, '-': 0});

  useEffect(() => {
    const {'+': a, '-': b} = categoryRecords(recordList);
    setAmount({'+': getAmount(a), '-': getAmount(b)});
  }, [recordList, categoryRecords, getAmount]);

  useEffect(() => {
    setRecordList(records);
  }, [records]);
  useEffect(() => {
    let rs = filterDateRecord(records, appearMonth, 'month');
    if (tagId) {
      rs = filterTagRecord(rs, tagId);
    }
    setRecordList(() => rs);
  }, [tagId, appearMonth, filterDateRecord, filterTagRecord, records]);


  useEffect(() => {
    setRecordGroup(Object.entries(
      recordList.reduce((obj: { [key: string]: RecordItem[] }, rs) => {
        const day = dayjs(rs.createAt).format('YYYY-MM-DD');
        return {...obj, [day]: (day in obj ? obj[day].concat([rs]) : [rs])};
      }, {})
    ));
  }, [recordList]);
  return (
    <>
      <Layout>
        <Header>
          <button onClick={() => {setVisibleTag(true);}}>{tagName}</button>
          <ol>
            <li onClick={() => {setVisibleMonth(true);}}>{appearMonth}</li>
            <li>总支出￥{monetaryUnit(amount['-'], true)}</li>
            <li>总收入￥{monetaryUnit(amount['+'], true)}</li>
          </ol>
        </Header>
        <Wrapper>
          {recordGroup.length === 0 ? <NotData text={'暂无记录...'}/> : recordGroup.map(([date, records]) =>
            <Records onRemove={(id: number) => {deleteRecord(id);}} key={date} records={records}/>
          )}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisibleAccounts(true)}/>

      <KeepAccounts
        ensure={(record: RecordItem) => {
          createRecord(record);
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
            setTagId(findTagUseText(value, category)!.id);
          else
            setTagId(0);
        }}/>
      <Tooltip onChange={(value: boolean) => setVisibleTip(value)} value='记一笔' inProp={visibleTip}/>
    </>
  );

});

export default Detail;