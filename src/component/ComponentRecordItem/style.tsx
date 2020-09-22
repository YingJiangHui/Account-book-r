import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 0 16px;
  margin: 4vw;
  height: 50%;
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
  >span{
    text-align: center;
    min-width: 82px;
  }
  .icon{
    background: ${theme.themeColor};
    border-radius: 50%;
    padding: 6px;
    fill: #fff;
    width: 42px;
    height: 42px;
    
     &.special{
          background: ${theme.special.themeColor};

    }
  }
`;
const Amount = styled.div`
  font-size: 48px;
`;

const Info = styled.ol`
  width: 100%;
  >li{
    margin-top: 10px;
    margin-bottom: 10px;

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
    &:first-child{
      color: #e01817;
      border-right: 1px solid rgba(0,0,0,0.1);
    }
  }
`;

export {Control, Info, Amount, View, Wrapper, TagIcon};