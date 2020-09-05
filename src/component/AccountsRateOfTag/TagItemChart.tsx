import React, {FC} from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import theme from '../../theme';
import cs from 'classnames';

const Wrapper = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
`;
const ProgressBar = styled.div`
    flex-grow: 1;
    background: #e5e5e5;
    border-radius: 2.5px;
    height: 5px;
  >p{
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
  >.icon{
    fill:#fff;
    background: ${theme.themeColor};
    width: 32px;
    height: 32px;
    padding: 5.5px;
    margin-right: 8px;
      &.special{
      background: ${theme.special.themeColor};
    }
  }
`;
const Amount = styled.div`
  text-align: end;
  width: 92px;
`
const Rate = styled.span`
  font-size: 14px;
  color: ${theme.tingeFontColor};
`

type Props = {
  tag: TagItem,
  rate: string,
}

const TagItemChart: FC<Props> = ({tag, rate}) => {
  return (
    <Wrapper>
      <Label>
        <Icon className={cs(tag.category === '+' ? 'special' : '')} name={tag.icon}/>
        <span>{tag.text}</span>
      </Label>
      <Rate>{rate}</Rate>
      <ProgressBar>
        <p className={cs(tag.category === '+' ? 'special' : '')} style={{width: rate}}></p>
      </ProgressBar>
      <Amount>
        ￥90.00
      </Amount>
    </Wrapper>
  );
};

export default TagItemChart;
