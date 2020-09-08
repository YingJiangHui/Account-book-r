import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import clone from '../lib/clone';
import generator from 'lib/createId';


const {createId} = generator('recordMaxId');

const Records: RecordItem[] = JSON.parse(window.localStorage.getItem('record') || '[]');
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
  }, [Records]);

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