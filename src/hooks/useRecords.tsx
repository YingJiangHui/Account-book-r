import {useEffect, useState} from 'react';
import useUpdate from './useUpdate';


const useRecords = () => {
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const addRecord = (record:RecordItem)=>{
    setRecordList([...recordList,record])
  }
  useUpdate(()=>{
    window.localStorage.setItem('record',JSON.stringify(recordList))
  },[recordList])
  useEffect(()=>{
    const storageRecord = JSON.parse(window.localStorage.getItem('record')||'[]')
    setRecordList(storageRecord)
  },[])
  return {recordList, setRecordList,addRecord};
};
export default useRecords;