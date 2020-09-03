import PopUpSelect from 'component/PopUp/PopUpSelect';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
import dayjs from 'dayjs';

const Container = styled.div`
  padding: 16px 12px 16px 12px;
p{
  margin: 8px;
  color: ${theme.tingeFontColor};
  text-align: center;
}
>ol{
  display: flex;
  flex-wrap: wrap;
  >li{ 
  font-size: 18px;
  border: 4px solid #fafafa;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 25%;
  }
}

`;
type Props = {
  onChange: (value: string) => void
  show: boolean,
  close: () => void
}
const PopUpMonthBox: FC<Props> = ({close, onChange, show}) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
  }, [show]);
  return (
    <PopUpSelect close={close} show={visible} title='选择月份'>
      <Container>
        <p>{dayjs(new Date()).format('YYYY年')}</p>
        <ol
          onClick={(e: React.MouseEvent) =>
            onChange(((e.target as Element).nodeName === 'LI' ? (e.target as Element).textContent : '') || '')}>
          {[0, 1, 2, 3, 4, 5, 6].map((month) => <li
            key={month}>{dayjs(new Date()).subtract(month, 'month').format('MM月')}</li>)}
        </ol>
      </Container>
    </PopUpSelect>
  );
};

export default PopUpMonthBox;