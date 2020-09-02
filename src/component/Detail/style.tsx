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