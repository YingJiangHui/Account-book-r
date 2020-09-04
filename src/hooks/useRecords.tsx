import {useEffect, useRef, useState} from 'react';
import useUpdate from './useUpdate';
import dayjs from 'dayjs';
import clone from '../lib/clone';
import {useTags} from 'hooks/useTags';

const useRecords = () => {

  const [recordList, setRecordList] = useState<RecordItem[]>([]);

  const addRecord = (record: RecordItem) => {
    if (record.createAt === '')
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    setRecordList(() => [...recordList, record]);
  };

  const {findTag} = useTags();

  const filterRecordUsedMonth = (month: string) => {
    return recordList.filter((record) => dayjs(record.createAt).format('MM月') === month);
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


  useUpdate(() => {
    window.localStorage.setItem('record', JSON.stringify(sortRecord()));
  }, [recordList]);

  useEffect(() => {
    fetchRecord();
  }, []);

  const sortRecord = (): RecordItem[] => {
    return (clone(recordList) as RecordItem[]).sort((a, b) => a.createAt > b.createAt ? -1 : 1);
  };

  const fetchRecord = () => {
    setTimeout(() => setRecordList(JSON.parse(window.localStorage.getItem('record') || '[]')));
  };

  return {recordList, addRecord, fetchRecord, filterRecordUsedMonth, totalAmount, filterRecordUsedTag};
};


export default useRecords;