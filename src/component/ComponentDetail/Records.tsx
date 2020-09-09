import React, {FC, useEffect} from 'react';
import Icon from '../common/Icon';
import dayjs from 'dayjs';
import {useTags} from 'hooks/useTags';
import cn from 'classnames';
import useRecords from 'hooks/useRecords';
import {Wrapper, Amount, Do, IconWrapper, Info, Main, DelRecord} from 'component/Records/records';
import {NavLink} from 'react-router-dom';
import monetaryUnit from '../../lib/monetaryUnitFormat';

type Props = {
  records: RecordItem[],
  onRemove:(id:number)=>void
}
const Records: FC<Props> = (props) => {
  const {totalAmount} = useRecords();
  const {findTag} = useTags();
  const {records,onRemove} = props;
  const recently = (date: string) => {
    const day = ['今天', '昨天', '前天'];
    const now = dayjs(new Date());
    for (let i = 0; i < 3; i++) {
      if (dayjs(date).isSame(now.subtract(i, 'day'), 'day')) {
        return day[i];
      }
    }
  };

  let startValue = 0
  let moveValue = 0
  let lastValue = 0
  const touchStart = (e: React.TouchEvent) => {
    const dom = (e.currentTarget as HTMLLIElement)
    const left = parseFloat(dom.style.left||'0')
    if(left!==0){
      startValue = e.targetTouches[0].clientX-left
    }else{
      startValue = e.targetTouches[0].clientX
    }
  };
  const touchEnd = (e: React.TouchEvent) => {
    const dom = (e.currentTarget as HTMLLIElement)

    if(Math.abs(lastValue-moveValue)>0.1){
      if(lastValue>moveValue){
        moveValue=-75
      }else{
        moveValue=0
      }
    }
    dom.style.left= `${moveValue}px`
  };
  const touchMove = (e: React.TouchEvent) => {
    moveValue =  e.targetTouches[0].clientX-startValue
    const dom = (e.currentTarget as HTMLLIElement)
    if(moveValue>0){
      moveValue=0
    }
    if(moveValue<=-75){
      moveValue=-75
    }

    if(Math.abs(lastValue-moveValue)>10){
      lastValue = moveValue
    }

         dom.style.left= `${moveValue}px`
  };

  return (
    <Wrapper>
      <header>
        <div className="date">{dayjs(records[0].createAt).format('MM月DD日')} {recently(records[0].createAt)}</div>
        <ol>
          <li><span>支</span> {monetaryUnit(totalAmount(records, '-'), true)}</li>
          <li><span>收</span> {monetaryUnit(totalAmount(records, '+'), true)}</li>
        </ol>
      </header>
      <Main>
        <ol>
          {records.map(record => (
            <NavLink key={record.id} to={'/detail/record/' + record.id}>
              <li onTouchMove={(e: React.TouchEvent) => {touchMove(e);}}
                  onTouchStart={(e: React.TouchEvent) => touchStart(e)}
                  onTouchEnd={(e: React.TouchEvent) => touchEnd(e)}>
                <DelRecord onClick={(e:React.MouseEvent)=>{e.preventDefault();onRemove(record.id) }}><Icon name={'remove'}/></DelRecord>
                <IconWrapper>
                  <Icon name={findTag(record.tagIndex)?.icon || ''}
                        className={cn(record.category === '+' ? 'special' : '')}/>
                </IconWrapper>
                <Info className='info'>
                  <Do>
                    <li>{findTag(record.tagIndex)?.text}</li>
                    <li className='done'>
                      {dayjs(record.createAt).format('HH:mm')} {record.note ? '| ' + record.note : ''}
                    </li>
                  </Do>
                  <Amount>{(record.category === "+" ? '+' : '-') + monetaryUnit(record.amount, true)}</Amount>
                </Info>

              </li>
            </NavLink>
          ))}

        </ol>

      </Main>
    </Wrapper>
  );
};

export default Records;