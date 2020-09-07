import styled from 'styled-components';
import theme from '../../theme';

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
  }
`;

export {Control, Info, Amount, View, Wrapper, TagIcon};