import React, {memo, useContext, useEffect, useState} from 'react';
import Layout from '../component/common/Layout';
import CollectAccounts from '../component/StatisticsComponent/CollectAccounts';
import AccountsRateOfTag from '../component/StatisticsComponent/AccountsRateOfTag';
import AccountsCompareChart from '../component/StatisticsComponent/AccountsCompareChart';
import  dayjs from 'dayjs';
import Context from 'contexts/context'
const now = dayjs(new Date());



const Statistics = memo(()=> {
  const {getAmount,records,filterDateRecord,categoryRecords,computerAmount} = useContext(Context)

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
  },[currentDate,filterDateRecord,getAmount,categoryRecords,records])

  return (
    <Layout>

      <CollectAccounts onChange={(value) => {setCurrentDate(value);}} value={amount}/>

      <AccountsRateOfTag value={computerAmount(recordList,'tag')} totalAmount={amount}/>

      <AccountsCompareChart startDate={currentDate} title={'每日对比'} unitTime='day' value={computerAmount(recordList,'day')}/>
      <AccountsCompareChart startDate={currentDate} title={'每月对比'} unitTime='month' value={computerAmount(records,'month')}/>
    </Layout>
  );
})

export default Statistics;