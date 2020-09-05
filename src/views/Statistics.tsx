import React, {useState} from 'react';
import Layout from '../component/Layout';
import CollectAccounts from '../component/CollectAccounts';
import AccountsRateOfTag from '../component/statisticsComponent/AccountsRateOfTag';
import useTagsuseTags from 'hooks/useRecords';

function Statistics() {
  const [currentDate, setCurrentDate] = useState('');
  const {filterRecordUsedTag,amountByTag} = useTagsuseTags();
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [amount,setAmount] = useState<{'+':number,'-':number}>({'+':0,'-':0})
  return (
    <Layout>
      <CollectAccounts monthRecord={(record) => setRecord(record)}
                       onChange={(value) => {setCurrentDate(value);}}
                       stream={(value) => setAmount(value)}/>
      <AccountsRateOfTag value={amountByTag(record,'tag')} totalAmount={amount}/>
    </Layout>
  );
}

export default Statistics;