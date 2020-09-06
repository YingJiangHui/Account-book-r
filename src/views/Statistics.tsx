import React, {useState} from 'react';
import Layout from '../component/Layout';
import CollectAccounts from '../component/CollectAccounts';
import AccountsRateOfTag from '../component/statisticsComponent/AccountsRateOfTag';
import useTagsuseTags from 'hooks/useRecords';
import AccountsCompareChart from '../component/statisticsComponent/AccountsCompareChart';

function Statistics() {
  const [currentDate, setCurrentDate] = useState('');
  const {filterRecordUsedTag,amountByTag} = useTagsuseTags();
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [amount,setAmount] = useState<{'+':number,'-':number}>({'+':0,'-':0})
  console.log(currentDate)
  return (
    <Layout>
      <CollectAccounts monthRecord={(record) => setRecord(record)}
                       onChange={(value) => {setCurrentDate(value);}}
                       stream={(value) => setAmount(value)}/>

      <AccountsRateOfTag value={amountByTag(record,'tag')} totalAmount={amount}/>
      <AccountsCompareChart startDate={currentDate} title={'每日对比'} unitTime='day' value={amountByTag(record,'day')}/>
      <AccountsCompareChart startDate={currentDate} title={'每月对比'} unitTime='month' value={amountByTag(record,'month')}/>

    </Layout>
  );
}

export default Statistics;