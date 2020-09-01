import React from 'react';
import createId from 'lib/createId';

const tagLists: TagItem[] = [
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
  const [tags, setTags] = React.useState<TagItem[]>([]);
  const tagList = React.useRef<TagItem[]>([]);
  React.useEffect(() => {
    tagList.current = JSON.parse(window.localStorage.getItem('tags') || '[]');
  }, []);
  const count = React.useRef<number>(0);
  React.useEffect(() => {
    count.current += 1;
  }, [tags]);

  React.useEffect(() => {
    if (count.current <= 1) return;
    let cloneTags: TagItem[] = clone(tags);
    for (let item of tagList.current) {
      cloneTags = cloneTags.filter(tag => tag.id !== item.id);
    }
    tagList.current=[...tagList.current, ...cloneTags]
    window.localStorage.setItem('tags', JSON.stringify(tagList.current));
  }, [tags]);
  const clone = (array: any[]) => {
    return JSON.parse(JSON.stringify(array));
  };
  const findTag = (id: number) => tags.find(tag => id === tag.id);
  const fetchTags = (category: Category) => {
    setTags(tagList.current.filter((tag) => category === tag.category));
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