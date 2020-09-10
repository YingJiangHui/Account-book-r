import React, {memo, useEffect, useState} from 'react';
import Layout from '../component/common/Layout';
import CollectAccounts from '../component/StatisticsComponent/CollectAccounts';
import AccountsRateOfTag from '../component/StatisticsComponent/AccountsRateOfTag';
import AccountsCompareChart from '../component/StatisticsComponent/AccountsCompareChart';
import  dayjs from 'dayjs';
import useRecords from 'hooks/useRecords';
import useTag from 'hooks/useTags'
import Context from 'contexts/context'
const now = dayjs(new Date());



const Statistics = memo(()=> {
  const recordAction = useRecords();
  const tagAction = useTag()
  const {getAmount,records,filterDateRecord,categoryRecords,computerAmount} = recordAction

  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(now);
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const [amount,setAmount] = useState<{'+':number,'-':number}>({'+':0,'-':0})

  useEffect(()=>{
    const rs = filterDateRecord(records,dayjs(currentDate).format('YYYY年MM月'),'month')
    const obj = categoryRecords(rs)
    const a = getAmount(obj['+'])
    const b = getAmount(obj['-'])
    setRecordList(rs);
    setAmount({'+':a,'-':b})
  },[currentDate])

  return (
    <Layout>
      <Context.Provider value={{...recordAction,...tagAction}}>

      <CollectAccounts onChange={(value) => {setCurrentDate(value);}} value={amount}/>

      <AccountsRateOfTag value={computerAmount(recordList,'tag')} totalAmount={amount}/>

      <AccountsCompareChart startDate={currentDate} title={'每日对比'} unitTime='day' value={computerAmount(recordList,'day')}/>
      <AccountsCompareChart startDate={currentDate} title={'每月对比'} unitTime='month' value={computerAmount(records,'month')}/>
      </Context.Provider>
    </Layout>
  );
})

export default Statistics;