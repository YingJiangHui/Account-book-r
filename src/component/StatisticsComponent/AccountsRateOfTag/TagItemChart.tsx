import React, {FC, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import Icon from '../../common/Icon';
import theme from '../../../theme';
import cs from 'classnames';
import monetaryUnit from '../../../lib/monetaryUnitFormat';
import Context from 'contexts/context'
const Wrapper = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProgressBar = styled.div`
    flex-grow: 1;
    background: #e5e5e5;
    border-radius: 2.5px;
    height: 5px;
  >p{
  transition: .5s;
    width:0%;
    border-radius: 2.5px;
    height: 100%;
    background: ${theme.themeColor};
    &.special{
      background: ${theme.special.themeColor};
    }
  }
`;
const Label = styled.div`
  display: flex;
  align-items: center;
  min-width: 110px;
  
  >span{
    font-size: 14px;
  }
  >.icon{
    transition: .3s;
    border-radius: 50%;
    fill:#fff;
    width: 32px;
    height: 32px;
    padding: 5.5px;
    margin-right: 8px;
      &.base{
      background: ${theme.themeColor};
      }
      &.special{
      background: ${theme.special.themeColor};
    }
  }
`;
const Grow = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
const Amount = styled.div`
  text-align: end;
  width: 82px;
`;
const Rate = styled.span`
  width: 48px;
  margin-right: 10px;
  font-size: 14px;
  color: ${theme.tingeFontColor};
`;

type Props = {
  index: string
  value: number,
  totalAmount: { '+': number, '-': number },
}

const TagItemChart: FC<Props> = ({value, totalAmount, index}) => {
  const indexTag = parseInt(index);
  const {findTagUseId} = useContext(Context);
  const [rate, setRate] = useState('');
  const [tag, setTag] = useState<TagItem>({} as TagItem);
  const tmpTag = findTagUseId(indexTag);

  useEffect(() => {
    if (tmpTag) {
      setTag(tmpTag);
      let rate = (value / totalAmount[tmpTag.category] * 100).toFixed(2).toString() + '%'

      setRate(rate);
    }
  }, [tmpTag]);
  return (
    <Wrapper>
      <Label>
        <Icon className={cs(tag.category === '+' ? 'special' : 'base')} name={tag.icon}/>
        <span>{tag.text}</span>
      </Label>
      <Grow>
      <Rate>{rate}</Rate>
      <ProgressBar>
        <p className={cs(tag.category === '+' ? 'special' : 'base')} style={{width: rate}}></p>
      </ProgressBar>
      </Grow>
      <Amount>
        {monetaryUnit(value,true)}
      </Amount>
    </Wrapper>
  );
};

export default TagItemChart;
