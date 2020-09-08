import React, {FC} from 'react';
import Icon from '../common/Icon';
import dayjs from 'dayjs';
import {useTags} from 'hooks/useTags';
import cn from 'classnames';
import useRecords from 'hooks/useRecords';
import {Wrapper, Amount, Do, IconWrapper, Info, Main} from 'component/Records/records';
import {NavLink} from 'react-router-dom';
import monetaryUnit from '../../lib/monetaryUnitFormat';

type Props = {
  records: RecordItem[]
}
const Records: FC<Props> = (props) => {
  const {totalAmount} = useRecords();
  const {findTag} = useTags();
  const {records} = props;
  console.log(records)
  const recently = (date: string) => {
    const day = ['今天', '昨天', '前天'];
    const now = dayjs(new Date());
    for (let i = 0; i < 3; i++) {
      if (dayjs(date).isSame(now.subtract(i, 'day'), 'day')) {
        return day[i];
      }
    }
  };
  return (
    <Wrapper>
      <header>
        <div className="date">{dayjs(records[0].createAt).format('MM月DD日')} {recently(records[0].createAt)}</div>
        <ol>
          <li><span>支</span> {monetaryUnit(totalAmount(records, '-'),true)}</li>
          <li><span>收</span> {monetaryUnit(totalAmount(records, '+'),true)}</li>
        </ol>
      </header>
      <Main>
        <ol>
          {records.map(record => (
            <NavLink key={record.id} to={'/detail/record/'+record.id}>
            <li  onTouchMove={(e: React.TouchEvent) => {console.log(e.touches);}}>
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
                <Amount>{(record.category === "+" ? '+' : '-') + monetaryUnit(record.amount,true)}</Amount>
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