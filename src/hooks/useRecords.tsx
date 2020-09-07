import {useEffect, useState} from 'react';
import useUpdate from './useUpdate';
import dayjs from 'dayjs';
import clone from '../lib/clone';
import generator from 'lib/createId';

const {createId} = generator('recordMaxId');

let records: RecordItem[] = JSON.parse(window.localStorage.getItem('record') || '[]');
if(records.length===0){
  const recordData:RecordItem[] = [
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-15T07:30:00', note:'', amount:100},
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-16T07:30:00', note:'', amount:500},
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-16T07:30:00', note:'', amount:10000},
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-18T07:30:00', note:'', amount:100},
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-20T07:30:00', note:'', amount:200},
    {id:createId(), tagIndex:3, category:'-', createAt:'2020-08-21T07:30:00', note:'', amount:200},
    ]
  records=recordData
}

const useRecords = () => {
  const [recordList, setRecordList] = useState<RecordItem[]>(records);
  const editRecord = (record: RecordItem, id: number) => {
    removeRecord(id);
    addRecord(record, id);
  };
  const addRecord = (record: RecordItem, id?: number) => {
    if (record.createAt === '')
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    record.id = id ? id : createId();
    setRecordList((recordList) => [...recordList, record]);
  };

  const findRecord = (id: number) => {
    return recordList.find((record) => record.id === id);
  };
  const removeRecord = (id: number) => {
    setRecordList((recordList) => recordList.filter((record) => record.id !== id));
  };

  useUpdate(() => {
    window.localStorage.setItem('record', JSON.stringify(sortRecord()));
  }, [recordList]);

  useEffect(() => {
    setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]'));
  }, [records]);

  const filterRecordUsedMonth = (month: string) => {
    return recordList.filter((record) => dayjs(record.createAt).format('YYYY年MM月') === month);
  };

  const filterRecordUsedTag = (TagId: number, records?: RecordItem[]) => {
    if (records) {
      return records.filter((record) => record.tagIndex === TagId);
    }
    return recordList.filter((record) => record.tagIndex === TagId);
  };

  const totalAmount = (records: RecordItem[], category?: Category): number =>
    category ?
      records.reduce((sum, record) => category === record.category ? sum + record.amount : sum, 0)
      : records.reduce((sum, record) => sum + record.amount, 0);

  const amountByTag = (record: RecordItem[], type: string):CategoryRecord=> {
    const hashMap: { [key: string]: string } = {
      'day': 'YYYY年MM月DD日',
      'month': 'YYYY年MM月',
      'year': 'YYYY年',
    };
    const obj:CategoryRecord= {
      '+':{},
      '-':{}
    };
    let key: string;
    for (let i = 0; i < record.length; i++) {
      if (type === 'tag') {
        const {tagIndex} = record[i];
        key = tagIndex.toString();
      } else if (Object.keys(hashMap).indexOf(type) >= 0) {
        const {createAt} = record[i];
        key = dayjs(createAt).format(hashMap[type]);
      } else {
        return obj
      }
      obj[record[i].category][key]
        ?
        obj[record[i].category][key] += record[i].amount
        :
        obj[record[i].category][key] = record[i].amount;
    }
    console.log(obj);
    return obj;
  };
  const sortRecord = (): RecordItem[] => {
    return (clone(recordList) as RecordItem[]).sort((a, b) => a.createAt > b.createAt ? -1 : 1);
  };

  const fetchRecord = () => {
    // setTimeout(() => setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]')));
  };

  return {
    recordList,
    findRecord,
    addRecord,
    fetchRecord,
    editRecord,
    removeRecord,
    filterRecordUsedMonth,
    totalAmount,
    filterRecordUsedTag,
    amountByTag
  };
};


export default useRecords;