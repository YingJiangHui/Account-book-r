import React from 'react';
import createId from 'lib/createId';
const find = (id: number, list: TagItem[]) => list.find(tag => id === tag.id);
const tagList:TagItem[] = [
  {id: createId(), icon: 'clothes', text: '服装美容',category:'-'},
  {id: createId(), icon: 'fun', text: '娱乐' ,category:'-'},
  {id: createId(), icon: 'learn', text: '学习' ,category:'-'},
  {id: createId(), icon: 'medical', text: '医疗' ,category:'-'},
  {id: createId(), icon: 'shopping', text: '购物' ,category:'-'},
  {id: createId(), icon: 'sport', text: '运动健身' ,category:'-'},
  {id: createId(), icon: 'salary', text: '薪水' ,category:'-'},
  {id: createId(), icon: 'transfer', text: '转账' ,category:'-'},
  {id: createId(), icon: 'salary', text: '薪水' ,category:'+'},
  {id: createId(), icon: 'transfer', text: '转账' ,category:'+'},
];

const useTags = () => {
  const [tags, setTags] = React.useState<TagItem[]>(tagList);
  const findTag = (id: number) => find(id, tags);
  const getTags=(category:Category)=>{
    return tags.filter((tag)=>category===tag.category)
  }
  return {tags,getTags, setTags, findTag};
};

export {
  useTags
};