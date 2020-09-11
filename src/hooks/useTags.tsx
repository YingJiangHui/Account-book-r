import {useEffect, useState} from 'react';
import generator from 'lib/createId';
import useUpdate from './useUpdate';

let tagList = JSON.parse(window.localStorage.getItem('tags') || '[]');
const {createId} = generator('tagMaxId')

if (tagList.length === 0) {
  tagList = [
    {id: createId(), icon: 'clothes', text: '服装美容', category: '-'},
    {id: createId(), icon: 'fun', text: '娱乐', category: '-'},
    {id: createId(), icon: 'learn', text: '学习', category: '-'},
    {id: createId(), icon: 'medical', text: '医疗', category: '-'},
    {id: createId(), icon: 'shopping2', text: '购物', category: '-'},
    {id: createId(), icon: 'sport', text: '运动健身', category: '-'},
    {id: createId(), icon: 'salary', text: '薪水', category: '-'},
    {id: createId(), icon: 'house', text: '住房', category: '-'},
    {id: createId(), icon: 'live', text: '生活缴费', category: '-'},
    {id: createId(), icon: 'transfer', text: '转账', category: '-'},
    {id: createId(), icon: 'moneyManagement', text: '理财', category: '-'},
    {id: createId(), icon: 'pet', text:'宠物', category: '-'},
    {id: createId(), icon: 'rests', text: '其他', category: '-'},
    {id: createId(), icon: 'travel', text: '旅行', category: '-'},
    {id: createId(), icon: 'salary', text: '薪水', category: '+'},
    {id: createId(), icon: 'transfer', text: '转账', category: '+'},
    {id: createId(), icon: 'moneyManagement', text: '理财', category: '+'},
    {id: createId(), icon: 'redPacket', text: '红包', category: '+'},
    {id: createId(), icon: 'rests', text: '其他', category: '+'},
    {id: createId(), icon: 'bonus', text: '奖金', category: '+'},
    {id: createId(), icon: 'refund', text: '退款', category: '+'},
  ];
}

export interface TagAction {
  findTagUseText:(text:string, category:Category)=>TagItem
  findTagUseId:(id:number)=>TagItem
  tags:TagItem[],
  deleteTag:(id: number)=>void
  updateTag :(id: number, text: string)=>void
  createTags: (name: string, category: Category)=>void
  categoryTags:  typeof hashMap
}

let hashMap:{[k:string]:TagItem[]} = {
  '+':[],
  '-':[]
}
const useTags = ():TagAction => {

  const [tags, setTags] = useState<TagItem[]>(tagList);
  const [categoryTags,setCategoryTags] = useState<typeof hashMap>({'+':[],'-':[]})

  useEffect(()=>{
    hashMap={
      '+':[],
      '-':[]
    }
    tags.forEach((t)=>{
      hashMap[t.category].push(t)
    })
    setCategoryTags(hashMap)
  },[tags])

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, tags);



  const findTagUseText = (text:string, category:Category)=>{
    return tags.filter((ts)=>ts.text===text&&ts.category===category)[0]
  }

  const findTagUseId = (id: number) => {
    return tags.filter(tag => id === tag.id)[0]
  };

  const createTags = (name: string, category: Category) => {
    setTags((tags)=>[...tags, {id: createId(), icon: 'accounts', text: name, category}]);
  };
  const deleteTag = (id: number) => {
    setTags((tags)=>tags.filter(item => item.id !== id));
  };
  const updateTag = (id: number, text: string) => {
    setTags((tags)=>tags.map(tag => tag.id === id ? {...tag, text} : tag));
  };

  return {tags,deleteTag, updateTag, createTags, findTagUseId,findTagUseText,categoryTags};
};

export default useTags;