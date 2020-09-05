import {useEffect, useState} from 'react';
import useUpdate from './useUpdate';
import dayjs from 'dayjs';
import clone from '../lib/clone';
import generator from 'lib/createId'
import RecordItem from '../views/RecordItem';
const {createId} =  generator('recordMaxId')

const Records:RecordItem[] = JSON.parse(window.localStorage.getItem('record') || '[]')
const useRecords = () => {

  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const editRecord = (record:RecordItem,id:number)=>{
    removeRecord(id);
    addRecord(record,id)
  }
  const addRecord = (record: RecordItem,id?:number) => {
    if (record.createAt === '')
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    record.id = id?id:createId()
    setRecordList((recordList) => [...recordList, record]);
  };

  const findRecord = (id:number)=>{
    return recordList.find((record)=>record.id ===id);
  }
  const removeRecord = (id:number)=>{
    setRecordList((recordList)=>recordList.filter((record)=>record.id!==id))
  }

  useUpdate(() => {
    window.localStorage.setItem('record', JSON.stringify(sortRecord()));
  }, [recordList]);

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



  const sortRecord = (): RecordItem[] => {
    return (clone(recordList) as RecordItem[]).sort((a, b) => a.createAt > b.createAt ? -1 : 1);
  };

  const fetchRecord = () => {
    setTimeout(() => setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]')));
  };

  return {recordList, findRecord,addRecord, fetchRecord,editRecord,removeRecord, filterRecordUsedMonth, totalAmount, filterRecordUsedTag};
};


export default useRecords;