import React from 'react';

const useIncomeTagsList=()=>{
  const [incomeTags,setIncomeTags]= React.useState<TagItem[]>([
    {icon: 'clothes', text: '服装美容'},
    {icon: 'fun', text: '娱乐'},
    {icon: 'learn', text: '学习'},
    {icon: 'medical', text: '医疗'},
    {icon: 'shopping', text: '购物'},
    {icon: 'sport', text: '运动健身'},

    {icon: 'salary', text: '薪水'},
    {icon: 'transfer', text: '转账'},
  ])
  return {incomeTags,setIncomeTags}
}
const useDisburseTagsList=()=>{
  const [disburseTags,setDisburseTags] = React.useState<TagItem[]>([
    {icon: 'salary', text: '薪水'},
    {icon: 'transfer', text: '转账'},
  ])
  return{disburseTags,setDisburseTags}
}
export {
  useDisburseTagsList,
  useIncomeTagsList
}