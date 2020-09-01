import React from 'react';
import createId from 'lib/createId';

const tagList: TagItem[] = [
  {id: createId(), icon: 'clothes', text: '服装美容', category: '-'},
  {id: createId(), icon: 'fun', text: '娱乐', category: '-'},
  {id: createId(), icon: 'learn', text: '学习', category: '-'},
  {id: createId(), icon: 'medical', text: '医疗', category: '-'},
  {id: createId(), icon: 'shopping', text: '购物', category: '-'},
  {id: createId(), icon: 'sport', text: '运动健身', category: '-'},
  {id: createId(), icon: 'salary', text: '薪水', category: '-'},
  {id: createId(), icon: 'transfer', text: '转账', category: '-'},
  {id: createId(), icon: 'salary', text: '薪水', category: '+'},
  {id: createId(), icon: 'transfer', text: '转账', category: '+'},
];

const useTags = () => {
  const [tags, setTags] = React.useState<TagItem[]>(tagList);
  const findTag = (id: number) => tags.find(tag => id === tag.id)
  const fetchTags = (category: Category) => {
    setTags(tagList.filter((tag) => category === tag.category));
  };
  const updateTags = (name: string, category: Category) => {
    setTags(tags.concat([{id: createId(), icon: 'accounts', text: name, category}]));
  };
  const removeTag = (id: number) => {
    setTags(tags.filter(item => item.id !== id));
  };
  const editTag = (id: number, text: string) => {
    setTags(tags.map(tag => tag.id === id ? {...tag, text} : tag));
  };
  return {tags, fetchTags, setTags, removeTag, editTag, findTag, updateTags};
};

export {
  useTags
};