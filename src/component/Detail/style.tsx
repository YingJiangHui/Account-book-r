import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.div`
    padding: 10px;
`
const Header = styled.header`
  background: ${theme.themeColor};
  color: #fff;
  padding: 16px;
  font-size: 14px;
  button{
    background: #51bd83;
    color: #fff;
    padding: 5px 15px;
    border-radius: 2px;
    
  }
  >ol{
    margin-top: 20px;
    display: flex;
    min-width: 300px;
    >li{
    color: rgba(255,255,255,0.8);
    &:nth-child(1){
    color: #fafafa;
      width: 90px;
      position: relative;
      &::after{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        border-style: solid;
        border-color: rgba(255,255,255,0.5) transparent transparent transparent;
        border-width: 6px;
      }
    }
    &:last-child{
      margin-left: 15px;
    }
    
    &:nth-last-child(2){
      margin-left: 20px;
    }
      >input{
        border: none;
        fill:#fff;
        color: inherit;
        background: transparent;
        ::-webkit-calendar-picker-indicator {
            color: #fff;
         }
      }  
    }
  }
`

export {Wrapper,Header}