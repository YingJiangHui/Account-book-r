import { useState} from 'react';
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
  ];
}


interface RecordAction {
  createRecord:(record:RecordItem)=>void
  deleteRecord : (id: number) =>void
  updateRecord : (id: number, record: RecordItem) =>void
  findRecord:(id: number)=>RecordItem
  getAmount:(rs: RecordItem[])=>number
}

const dateMap: { [key: string]: string } = {
  'day': 'YYYY-MM-DD',
  'month': 'YYYY-MM'
};
const useRecords = ():RecordAction => {
  const [records, setRecords] = useState<RecordItem[]>(recordList);

  useUpdate(() => {
    _sortRecord();
    window.localStorage.setItem('record', JSON.stringify(records));
  }, [records]);

  const createRecord = (record: RecordItem) => {
    if (!record.createAt)
      record.createAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    setRecords((rs) => [...rs, record]);
  };

  const deleteRecord = (id: number) => {
    setRecords((rs) => rs.filter((r) => r.id !== id));
  };
  const updateRecord = (id: number, record: RecordItem) => {
    setRecords((rs) => rs.map(r => r.id === id ? record : r));
  };

  const findRecord = (id: number) => {
    return records.filter((r) => r.id === id)[0];
  };

  const getAmount = (rs: RecordItem[]) => {
    return rs.reduce((sum, r) => sum + r.amount, 0);
  };
  const _sortRecord = () => {
    setRecords((rs) => rs.sort((a, b) => a.createAt < b.createAt ? -1 : 1));
  };

  const filterDateRecord = (rs: RecordItem[], date: string, type: string) => {
    return rs.filter((r) => dayjs(r.createAt).format(dateMap[type]) === dayjs(date).format(dateMap[type]));
  };
  const filterTagRecord = (rs:RecordItem[],tagID:number)=>{
    return rs.filter((r)=>r.tagIndex===tagID)
  }
  return {createRecord,deleteRecord,updateRecord,findRecord,getAmount};
};
export default useRecords;