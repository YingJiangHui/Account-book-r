import React, {memo, useState} from 'react';
import Layout from '../component/common/Layout';
import CollectAccounts from '../component/StatisticsComponent/CollectAccounts';
import AccountsRateOfTag from '../component/StatisticsComponent/AccountsRateOfTag';
import useRecords from 'hooks/useRecords';
import AccountsCompareChart from '../component/StatisticsComponent/AccountsCompareChart';
import  dayjs from 'dayjs';
const now = dayjs(new Date())

const Statistics = memo(()=> {

  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(now);
  const {amountByTag,recordList} = useRecords();
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [amount,setAmount] = useState<{'+':number,'-':number}>({'+':0,'-':0})

  return (
    <Layout>
      <CollectAccounts monthRecord={(record) => setRecord(record)}
                       onChange={(value) => {setCurrentDate(value);}}
                       stream={(value) => setAmount(value)}/>

      <AccountsRateOfTag value={amountByTag(record,'tag')} totalAmount={amount}/>
      <AccountsCompareChart startDate={currentDate} title={'每日对比'} unitTime='day' value={amountByTag(record,'day')}/>
      <AccountsCompareChart startDate={currentDate} title={'每月对比'} unitTime='month' value={amountByTag(recordList,'month')}/>

    </Layout>
  );
})

export default Statistics;