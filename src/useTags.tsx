import React from 'react';

const useIncomeTagsList = () => {
  const [incomeTags, setIncomeTags] = React.useState<TagItem[]>([
    {id: 1, icon: 'clothes', text: '服装美容'},
    {id: 2, icon: 'fun', text: '娱乐'},
    {id: 3, icon: 'learn', text: '学习'},
    {id: 4, icon: 'medical', text: '医疗'},
    {id: 5, icon: 'shopping', text: '购物'},
    {id: 6, icon: 'sport', text: '运动健身'},
    {id: 7, icon: 'salary', text: '薪水'},
    {id: 8, icon: 'transfer', text: '转账'},
  ]);
  return {incomeTags, setIncomeTags};
};
const useDisburseTagsList = () => {
  const [disburseTags, setDisburseTags] = React.useState<TagItem[]>([
    {id: 1, icon: 'salary', text: '薪水'},
    {id: 2, icon: 'transfer', text: '转账'},
  ]);
  return {disburseTags, setDisburseTags};
};
export {
  useDisburseTagsList,
  useIncomeTagsList
};