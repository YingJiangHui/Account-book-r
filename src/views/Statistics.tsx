import React, {useState} from 'react';
import Layout from '../component/Layout';
import CollectAccounts from '../component/CollectAccounts';
import AccountsRateOfTag from '../component/AccountsRateOfTag';
import {useTags} from 'hooks/useTags';
import useTagsuseTags from 'hooks/useRecords';

function Statistics() {
  const [currentDate, setCurrentDate] = useState('');
  const {tags} = useTags();
  const {filterRecordUsedTag,amountByTag} = useTagsuseTags();
  const [record, setRecord] = useState<RecordItem[]>([]);
  return (
    <Layout>
      <CollectAccounts monthRecord={(record) => { console.log(amountByTag(record,'day'));}}
                       onChange={(value) => {setCurrentDate(value);}}
                       stream={(outgoings, income) => {console.log(outgoings, income);}}/>
      <AccountsRateOfTag tags={tags}/>
    </Layout>
  );
}

export default Statistics;