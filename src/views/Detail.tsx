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
import useUpdate from '../hooks/useUpdate';
import Context from 'contexts/context'

const nowMonth = dayjs(new Date()).format('YYYY年MM月');
const Detail: FC = memo(() => {

  const {tags, findTagUseText,createRecord, deleteRecord, updateRecord, getAmount, records, categoryRecords, filterDateRecord, filterTagRecord} = useContext(Context)

  const [visibleAccounts, setVisibleAccounts] = useState<boolean>(false);
  const [visibleMonth, setVisibleMonth] = useState(false);
  const [visibleTip, setVisibleTip] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);
  const [tagName, setTagName] = useState('全部类型');
  const {filterRecordUsedMonth, recordList, fetchRecord, removeRecord, filterRecordUsedTag, totalAmount, editRecord, addRecord} = useRecords();
  const [appearMonth, setAppearMonth] = useState(nowMonth);
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const [tagId, setTagId] = useState<number>(0);
  const [recordGroup, setRecordGroup] = useState<any[][]>([]);

  const [amount, setAmount] = useState({'+': 0, '-': 0});

  useUpdate(() => {
    const {'+': a, '-': b} = categoryRecords(records);
    setAmount({'+': getAmount(a), '-': getAmount(b)});
  }, [records]);
  useEffect(() => {
    console.log(records)
    setRecordList(records);
  }, [records]);
  useUpdate(() => {
    let  rs = filterDateRecord(records, appearMonth,'month')
    if (tagId) {
      rs  =filterTagRecord(rs, tagId)
    }
    setRecordList(()=>rs);
  }, [tagId,appearMonth]);
  useUpdate(() => {


  }, [appearMonth]);

  useEffect(()=>{
    setRecordGroup(Object.entries(
      recordList.reduce((obj: { [key: string]: RecordItem[] }, rs) => {
        const day = dayjs(rs.createAt).format('YYYY-MM-DD');
        return {...obj, [day]: (day in obj ? obj[day].concat([rs]) : [rs])};
      }, {})
    ))
  },[recordList])
  return (
    <>
      <Tooltip onChange={(value: boolean) => setVisibleTip(value)} value='记一笔' inProp={visibleTip}/>
      <Layout>
        <Header>
          <button onClick={() => {setVisibleTag(true);}}>{tagName}</button>
          <ol>
            <li onClick={() => {setVisibleMonth(true);}}>{appearMonth}</li>
            <li>总支出￥{monetaryUnit(totalAmount(record, '-'), true)}</li>
            <li>总收入￥{monetaryUnit(totalAmount(record, '+'), true)}</li>
          </ol>
        </Header>
        <Wrapper>
          {recordGroup.length === 0 ? <NotData text={'暂无记录...'}/> : recordGroup.map(([date, records]) =>
            <Records onRemove={(id: number) => {removeRecord(id);}} records={records} key={date}/>
          )}
        </Wrapper>
      </Layout>
      <OpenRecordButton onClick={() => setVisibleAccounts(true)}/>

      <KeepAccounts
        ensure={(record: RecordItem, id?) => {
          if (id) {
            editRecord(record, id);
          } else {
            addRecord(record);
          }
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
      </Context.Provider>
    </>
  );

});

export default Detail;