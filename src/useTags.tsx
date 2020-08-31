import React from 'react';
import createId from 'lib/createId';

const find = (id: number, list: TagItem[]) => list.find(tag => id === tag.id);
const income = [
  {id: createId(), icon: 'clothes', text: '服装美容'},
  {id: createId(), icon: 'fun', text: '娱乐'},
  {id: createId(), icon: 'learn', text: '学习'},
  {id: createId(), icon: 'medical', text: '医疗'},
  {id: createId(), icon: 'shopping', text: '购物'},
  {id: createId(), icon: 'sport', text: '运动健身'},
  {id: createId(), icon: 'salary', text: '薪水'},
  {id: createId(), icon: 'transfer', text: '转账'},
];
const disburse = [
  {id: createId(), icon: 'salary', text: '薪水'},
  {id: createId(), icon: 'transfer', text: '转账'},
];

const useIncomeTagsList = () => {
  const [incomeTags, setIncomeTags] = React.useState<TagItem[]>(income);
  const findTag = (id: number) => find(id, incomeTags);
  return {incomeTags, setIncomeTags, findTag};
};
const useDisburseTagsList = () => {
  const [disburseTags, setDisburseTags] = React.useState<TagItem[]>(disburse);
  const findTag = (id: number) => find(id, disburseTags);
  return {disburseTags, setDisburseTags, findTag};
};
export {
  useDisburseTagsList,
  useIncomeTagsList
};