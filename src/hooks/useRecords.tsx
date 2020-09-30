import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import generator from 'lib/createId';
import useUpdate from './useUpdate';


const {createId} = generator('recordMaxId');


let recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('record') || '[]');

if (recordList.length === 0) {
  recordList = [
    {id: createId(), "category": "-", tagIndex: 14, amount: 2000, note: "", createAt: "2020-09-08T17:03:38"}
    , {id: createId(), "category": "+", tagIndex: 20, amount: 3000, note: "", createAt: "2020-09-07T17:03:18"}
    , {id: createId(), "category": "+", tagIndex: 21, amount: 600, note: "", createAt: "2020-09-06T17:02:36"}
    , {id: createId(), "category": "+", tagIndex: 16, amount: 7000, note: "", createAt: "2020-09-05T17:02:13"}
    , {id: createId(), "category": "+", tagIndex: 17, amount: 2000, note: "", createAt: "2020-09-08T17:02:04"}
    , {id: createId(), "category": "-", tagIndex: 2, amount: 500, note: "", createAt: "2020-09-08T15:01:36"}
    , {id: createId(), "category": "-", tagIndex: 10, amount: 5000, note: "", createAt: "2020-09-15T17:01:24"}
    , {id: createId(), "category": "-", tagIndex: 2, amount: 500, note: "", createAt: "2020-09-06T17:01:36"}
    , {id: createId(), "category": "-", tagIndex: 10, amount: 5000, note: "", createAt: "2020-08-25T17:01:24"}
    , {id: createId(), "category": "-", tagIndex: 8, amount: 1666, note: "", createAt: "2020-08-23T17:00:58"}
    , {id: createId(), "category": "-", tagIndex: 6, amount: 200, note: "", createAt: "2020-08-16T17:00:45"}
    , {id: createId(), "category": "-", tagIndex: 4, amount: 100, note: "", createAt: "2020-08-10T17:00:29"}
    , {id: createId(), "category": "-", tagIndex: 8, amount: 1666, note: "", createAt: "2020-07-16T17:00:58"}
    , {id: createId(), "category": "-", tagIndex: 6, amount: 200, note: "", createAt: "2020-08-16T17:00:45"}
    , {id: createId(), "category": "-", tagIndex: 8, amount: 1666, note: "", createAt: "2020-10-4T17:00:58"}
    , {id: createId(), "category": "-", tagIndex: 6, amount: 200, note: "", createAt: "2020-10-5T17:00:45"}
  ];
}

type CategoryRecords = { '+': RecordItem[], '-': RecordItem[] }

export interface RecordAction {
  records: RecordItem[]
  createRecord: (record: RecordItem) => void
  deleteRecord: (id: number) => void
  updateRecord: (id: number, record: RecordItem) => void
  findRecord: (id: number) => RecordItem
  getAmount: (rs: RecordItem[]) => number
  filterDateRecord: (rs: RecordItem[], date: string, type: string) => RecordItem[]
  categoryRecords: (rs: RecordItem[]) => CategoryRecords
  categoryComputerAmount: (rs: RecordItem[], type: Options) => { [key: string]: number }
  computerAmount: (rs: RecordItem[], type: Options) => CategoryRecordAmount
  filterTagRecord: (rs: RecordItem[], tagID: number) => RecordItem[]
}

type Options = 'tag' | 'day' | 'month'

const dateMap: { [key: string]: string } = {
  'day': 'YYYY年MM月DD日',
  'month': 'YYYY年MM月',
};

const useRecords = (): RecordAction => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(()=>{
    setRecords(recordList)
  },[])


  const createRecord = (record: RecordItem) => {
    if (!record.createAt)
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    record.id = createId();
    setRecords((rs) => _sortRecord([...rs, record]));
  };

  const deleteRecord = (id: number) => {
    setRecords((rs) => rs.filter((r) => r.id !== id));
  };
  const updateRecord = (id: number, record: RecordItem) => {
    setRecords((rs) => _sortRecord(rs.map(r => r.id === id ? {id, ...record} : r)));
  };

  const findRecord = (id: number) => {
    return records.filter((r) => r.id === id)[0];
  };

  useUpdate(() => {
    window.localStorage.setItem('record', JSON.stringify(records));
  }, records);

  const categoryRecords = (rs: RecordItem[]) => {
    return rs.reduce((obj: CategoryRecords, rs) => {
      return {
        '+': obj['+'].concat(rs.category === '+' ? [rs] : []),
        '-': obj['-'].concat(rs.category === '-' ? [rs] : [])
      };
    }, {'+': [], '-': []});
  };

  const getAmount = (rs: RecordItem[]) => {
    return rs.reduce((sum, r) => sum + r.amount, 0);
  };

  const categoryComputerAmount = (rs: RecordItem[], type: Options) => {

      return rs.reduce((obj: { [key: string]: number }, r) => {
        const key = ((type==='tag')?r.tagIndex.toString(): dayjs(r.createAt).format(dateMap[type]))
        return {...obj, [key]: key in obj ? obj[key] + r.amount : r.amount};
      }, {});
  };

  const computerAmount = (rs: RecordItem[], type: Options) => {
    const {'+': a, '-': b} = categoryRecords(rs);
    return {'+': categoryComputerAmount(a, type), '-': categoryComputerAmount(b, type)};
  };

  const _sortRecord = (rs:RecordItem[]) => {
    return rs.sort((a, b) => a.createAt > b.createAt ? -1 : 1);
  };

  const filterDateRecord = (rs: RecordItem[], date: string, type: string) => {
    return rs.filter((r) =>
      dayjs(r.createAt).format(dateMap[type]) === date);
  };
  const filterTagRecord = (rs: RecordItem[], tagID: number) => {
    return rs.filter((r) => r.tagIndex === tagID);
  };

  return {
    createRecord,
    deleteRecord,
    updateRecord,
    findRecord,
    getAmount,
    records,
    filterDateRecord,
    categoryRecords,
    computerAmount,
    categoryComputerAmount,
    filterTagRecord
  };
};
export default useRecords;