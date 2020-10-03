import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1em 1em 0 1em;
  margin: 4vw;
`;
const View = styled.div`
 display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;
const TagIcon = styled.div`
  display: flex;
  align-items: center;
  >span{
    margin-left: 1em;
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
  padding: 0.4em;
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
    min-width: 64px;
    margin-right: 32px;
    }
  }
`;
const Control = styled.div`
  >button{
    padding: 1.5em;
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