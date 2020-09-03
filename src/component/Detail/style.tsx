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
    max-width: 500px;
    justify-content: space-between;
    >li{
    &:nth-child(1){
      position: relative;
      &::after{
        position: absolute;
        left: 120%;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        border-width: 6px;
      }
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