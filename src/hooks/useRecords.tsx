import {useEffect, useState} from 'react';
import useUpdate from './useUpdate';
import dayjs from 'dayjs'

const useRecords = () => {
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const addRecord = (record:RecordItem)=>{
    if(record.createAt==='')
      record.createAt=dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
    setRecordList(()=>[...recordList,record])

  }
  useUpdate(()=>{
    window.localStorage.setItem('record',JSON.stringify(recordList))
  },[recordList])

  useEffect(()=>{
    setRecordList(()=>fetchRecord())
  },[])

  const fetchRecord = () :RecordItem[]=>{
    const storageRecord = JSON.parse(window.localStorage.getItem('record')||'[]')

    return storageRecord
  }
  return {recordList, setRecordList,addRecord,fetchRecord};
};
export default useRecords;