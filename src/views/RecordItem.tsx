import styled from 'styled-components';
import React, {FC, memo, useEffect, useState} from 'react';
import Layout from '../component/Layout';
import {useParams} from "react-router-dom";
import useRecords from 'hooks/useRecords';
import Icon from '../component/Icon';
import theme from '../theme';
import {useTags} from '../hooks/useTags';
import dayjs from 'dayjs'

const Wrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 0 16px;
  margin: 4vw;
  height: 92vw;
`;
const View = styled.div`
 display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 85%;
  padding: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;
const TagIcon = styled.div`
  display: flex;
  align-items: center;
  .icon{
    margin-right: 16px;
    background: ${theme.themeColor};
    border-radius: 50%;
    padding: 6px;
    fill: #fff;
    width: 42px;
    height: 42px;
  }
`;
const Amount = styled.div`
  font-size: 48px;
`;

const Info = styled.ol`
  width: 100%;
  >li{
    display: flex;
    >span{
    display: inline-block;
    color: ${theme.tingeFontColor};
    width: 64px;
    margin-right: 32px;
    }
  }
`;
const Control = styled.div`

    height:15%;
  >button{
    background: transparent;
    border: none;
    width: 50%;
    height: 100%;
  }
`;

const RecordItem: FC = memo(() => {
  const {findRecord} = useRecords();
  const {findTag} = useTags();
  const {id} = useParams();
  const recordItem = findRecord(parseInt(id))
  const [record ,setRecord]= useState<RecordItem>(recordItem as RecordItem)
  const [tag,setTag] = useState<TagItem>({} as TagItem)

  useEffect(()=>{
    if(recordItem){
      setRecord(recordItem)
      setTag(findTag(recordItem.tagIndex)!)
    }
  },[recordItem])

  return (
    <Layout>
      <Wrapper>
        <View>
          <TagIcon>
            <Icon name={tag?.icon}/><span>{tag?.text}</span>
          </TagIcon>
          <Amount>
            {(record?.category === "+" ? '+' : '-')}{record?.amount}
          </Amount>
          <Info>
            <li><span>记录时间</span>{dayjs(record?.createAt).format('YYYY年MM月DD日 HH:mm') }</li>
            <li><span>备注</span>{record?.note}</li>
          </Info>
        </View>
        <Control>
          <button>删除</button>
          <button>编辑</button>
        </Control>
      </Wrapper>
    </Layout>
  );
});

export default RecordItem;