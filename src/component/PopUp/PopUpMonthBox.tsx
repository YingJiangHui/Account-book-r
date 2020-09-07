import PopUpNoSure from 'component/PopUp/popUpBoxComponent/PopUpNoSure';
import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import dayjs from 'dayjs';
import cs from 'classnames'
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
    &.selected{
      background: ${theme.themeColor};
      color: #fff;
    }
  }
}

`;
type Props = {
  onChange: (value: dayjs.Dayjs) => void
  show: boolean,
  close: () => void,
}
const PopUpMonthBox: FC<Props> = memo(({close, onChange,show}) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
  }, [show]);
  const [selected,setSelected] = useState(0)
  const now = dayjs(new Date())

  const prevNum = [0, 1, 2, 3, 4, 5, 6]
const onClick = (e: React.MouseEvent,month:number)=>{
  onChange(now.subtract(month,'month'))
  setSelected(month)
}

  return (
    <PopUpNoSure close={close} show={visible} title='选择月份'>
      <Container>
        <p>{now.format('YYYY年')}</p>
        <ol>
          {[0, 1, 2, 3, 4, 5, 6].map((month) => <li className={cs(selected===month?'selected':'')} onClick={(e: React.MouseEvent)=>onClick(e,month)}
            key={month}>{dayjs(new Date()).subtract(month, 'month').format('MM月')}</li>)}
        </ol>
      </Container>
    </PopUpNoSure>
  );
});

export default PopUpMonthBox;