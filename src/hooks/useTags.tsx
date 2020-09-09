import React from 'react';
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
const useTags = () => {
  const [tags, setTags] = React.useState<TagItem[]>([]);

  React.useEffect(() => {
    setTags(tagList);
  }, []);

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  const findId = (text: string, category: Category):TagItem|undefined => {
    return tags.find(tag => tag.text === text && tag.category === category);
  };

  const findTag = (id: number) => tags.find(tag => id === tag.id);

  const fetchTags =(category: Category, tagList?: TagItem[]) => {
    if (tagList) {
      return tagList.filter((tag) => category === tag.category);
    }
    return tags.filter((tag) => category === tag.category);
  };
  const updateTags = (name: string, category: Category) => {
    setTags((tags)=>[...tags, {id: createId(), icon: 'accounts', text: name, category}]);
  };
  const removeTag = (id: number) => {
    setTags((tags)=>tags.filter(item => item.id !== id));
  };
  const editTag = (id: number, text: string) => {
    setTags((tags)=>tags.map(tag => tag.id === id ? {...tag, text} : tag));
  };
  return {tags, fetchTags, setTags, findId,removeTag, editTag, findTag, updateTags};
};

export {
  useTags
};