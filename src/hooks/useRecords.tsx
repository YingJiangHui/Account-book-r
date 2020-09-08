import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import clone from '../lib/clone';
import generator from 'lib/createId';


const {createId} = generator('recordMaxId');



let Records: RecordItem[] = JSON.parse(window.localStorage.getItem('record') || '[]');

if(Records.length===0){
  Records = [
    {id:createId(),"category":"-",tagIndex:14,amount:2000,note:"",createAt:"2020-09-08T17:03:38"}
    ,{id:createId(),"category":"+",tagIndex:20,amount:3000,note:"",createAt:"2020-09-07T17:03:18"}
    ,{id:createId(),"category":"+",tagIndex:21,amount:600,note:"",createAt:"2020-09-06T17:02:36"}
    ,{id:createId(),"category":"+",tagIndex:16,amount:7000,note:"",createAt:"2020-09-05T17:02:13"}
    ,{id:createId(),"category":"+",tagIndex:17,amount:2000,note:"",createAt:"2020-09-08T17:02:04"}
    ,{id:createId(),"category":"-",tagIndex:2,amount:500,note:"",createAt:"2020-09-01T17:01:36"}
    ,{id:createId(),"category":"-",tagIndex:10,amount:5000,note:"",createAt:"2020-08-25T17:01:24"}
    ,{id:createId(),"category":"-",tagIndex:8,amount:1666,note:"",createAt:"2020-08-23T17:00:58"}
    ,{id:createId(),"category":"-",tagIndex:6,amount:200,note:"",createAt:"2020-08-16T17:00:45"}
    ,{id:createId(),"category":"-",tagIndex:4,amount:100,note:"",createAt:"2020-08-10T17:00:29"}
    ,{id:createId(),"category":"-",tagIndex:8,amount:1666,note:"",createAt:"2020-07-16T17:00:58"}
    ,{id:createId(),"category":"-",tagIndex:6,amount:200,note:"",createAt:"2020-08-16T17:00:45"}
  ]
  window.localStorage.setItem('record',JSON.stringify(Records)||'[]')
}

const useRecords = () => {

  const [recordList, setRecordList] = useState<RecordItem[]>([]);


  const editRecord = (record: RecordItem, id: number) => {
    let newRecord = _removeRecord(id);
    newRecord = _addRecord(record,newRecord,id)
    setRecordList(newRecord)
    saveStorage(newRecord)
  };

  const addRecord = (record: RecordItem) => {
    const newRecord = _addRecord(record);
    setRecordList(newRecord);
    saveStorage(newRecord);
  };

  const _addRecord = (record: RecordItem,records?:RecordItem[],id?:number) => {
    if (record.createAt === '')
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    record.id =id?id:createId()
    if(records)
      return [...records, record];
    else
      return [...recordList, record];

  };
  const removeRecord = (id: number) => {
    const newRecord = _removeRecord(id);
    setRecordList(newRecord);
    saveStorage(newRecord);
  };
  const _removeRecord = (id: number) => {
    return recordList.filter((record) => record.id !== id);
  };


  const findRecord = (id: number) => {
    return recordList.find((record) => record.id === id);
  };
  const saveStorage = (records: RecordItem[]) => {
    window.localStorage.setItem('record', JSON.stringify(sortRecord(records)));
  };

  useEffect(() => {
    setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]'));
  }, []);

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

  const amountByTag = (record: RecordItem[], type: string): CategoryRecord => {
    const hashMap: { [key: string]: string } = {
      'day': 'YYYY年MM月DD日',
      'month': 'YYYY年MM月',
      'year': 'YYYY年',
    };
    const obj: CategoryRecord = {
      '+': {},
      '-': {}
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
        return obj;
      }
      obj[record[i].category][key]
        ?
        obj[record[i].category][key] += record[i].amount
        :
        obj[record[i].category][key] = record[i].amount;
    }
    return obj;
  };
  const sortRecord = (records?: RecordItem[]): RecordItem[] => {
    let newRecord = recordList;
    if (records)
      newRecord = records;
    return (clone(newRecord) as RecordItem[]).sort((a, b) => a.createAt > b.createAt ? -1 : 1);
  };

  const fetchRecord = () => {
    setTimeout(() => setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]')),);
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