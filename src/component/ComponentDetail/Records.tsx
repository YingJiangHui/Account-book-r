import React, {FC, useContext, useEffect, useState} from 'react';
import Icon from '../common/Icon';
import dayjs from 'dayjs';
import cn from 'classnames';
import {Wrapper, Amount, Do, IconWrapper, Info, Main, DelRecord} from 'component/Records/style';
import {NavLink} from 'react-router-dom';
import monetaryUnit from '../../lib/monetaryUnitFormat';
import Context from 'contexts/context';

type Props = {
  onRemove: (id: number) => void
  records: RecordItem[]
}
const Records: FC<Props> = (props) => {
  const {findTagUseId, categoryRecords, getAmount} = useContext(Context);
  const [amount, setAmount] = useState<{ '+': number, '-': number }>({'+': 0, '-': 0});
  const {onRemove, records} = props;

  useEffect(() => {
    const obj = categoryRecords(records);
    setAmount({'+': getAmount(obj['+']), '-': getAmount(obj['-'])});
    }, [records,getAmount,categoryRecords]);

  const recently = (date: string) => {
    const day = ['今天', '昨天', '前天'];
    const now = dayjs(new Date());
    for (let i = 0; i < 3; i++) {
      if (dayjs(date).isSame(now.subtract(i, 'day'), 'day')) {
        return day[i];
      }
    }
  };

  //moveDelete
  let startValue = 0;
  let moveValue = 0;
  const touchStart = (e: React.TouchEvent) => {
    const dom = (e.currentTarget as HTMLLIElement);
    const left = parseFloat(dom.style.left || '0');
    if (left !== 0) {
      startValue = e.targetTouches[0].clientX - left;
    } else {
      startValue = e.targetTouches[0].clientX;
    }
  };
  const stack: number[] = [];

  const touchEnd = (e: React.TouchEvent) => {
    const dom = (e.currentTarget as HTMLLIElement);
    if (!(Math.abs(stack[stack.length - 2] - stack[stack.length - 1]) === 0)) {
      moveValue= stack[stack.length - 1] < stack[stack.length - 2] ? -75 : 0;
    } else {
      moveValue = dom.offsetLeft < -35 ?  -75 : 0;
    }
  stack.length = 0;
  dom.style.left = `${moveValue}px`;
};
let timer = -1;
const touchMove = (e: React.TouchEvent) => {

  moveValue = e.targetTouches[0].clientX - startValue;
  const dom = (e.currentTarget as HTMLLIElement);
  if (moveValue > 0) {
    moveValue = 0;
  }
  if (moveValue <= -75) {
    moveValue = -75;
  }
  clearTimeout(timer);
  stack.push(moveValue);
  dom.style.left = `${moveValue}px`;
};

return (
  <Wrapper>
    <header>
      <div className="date">{dayjs(records[0].createAt).format('MM月DD日')} {recently(records[0].createAt)}</div>
      <ol>
        <li><span>支</span> {monetaryUnit(amount['-'], true)}</li>
        <li><span>收</span> {monetaryUnit(amount['+'], true)}</li>
      </ol>
    </header>
    <Main>
      <ol>
        {records.map(record => (
          <NavLink key={record.id} to={'/detail/record/' + record.id}>
            <li onTouchMove={(e: React.TouchEvent) => {touchMove(e);}}
                onTouchStart={(e: React.TouchEvent) => touchStart(e)}
                onTouchEnd={(e: React.TouchEvent) => touchEnd(e)}>
              <DelRecord onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onRemove(record.id);
              }}><Icon name={'remove'}/></DelRecord>
              <IconWrapper>
                <Icon name={findTagUseId(record.tagIndex)?.icon || ''}
                      className={cn(record.category === '+' ? 'special' : '')}/>
              </IconWrapper>
              <Info className='info'>
                <Do>
                  <li>{findTagUseId(record.tagIndex)?.text}</li>
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
}
;

export default Records;