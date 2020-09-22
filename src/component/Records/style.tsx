import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.section`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  header{
     padding: 16px;
     height: 68px;
     background: rgb(251, 251, 251);
     display: flex;
     justify-content: space-between;
     align-items: center;
  >.date{
  font-size: 17px;
  }

     >ol{
       display: flex;
       min-width: 130px;
       justify-content: space-between;
       align-items: center;
       >li{
       font-size: 14px;
       >span{
       color: #787878;
        background: #f2f2f2;
        padding: 2px;
       }
        margin-left: 10px;
       }
     }
  }
`;
const Main = styled.main`
    min-height: 78px;
    padding: 2px 16px;
     background: #fff;
     display: flex;
     justify-content: space-between;
     align-items: center;
    >ol{
          width: 100%;
      >a{
      &.info{
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }      
      &:last-child{
        .info{
          border: none;
        }
      }
      >li{
        position: relative;
        left: 0;
         //TODO
        display: flex;
        align-items: center;  
        }
      }
    }
`;
const DelRecord = styled.div`
position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -92px;
  top: 0;
  background: #fa524f;
  color: white;
  height: 75px;width: 75px;
  .icon{
    fill:#fff;
    height: 28px;
    width: 28px;
   }
`
const Amount = styled.div`
  min-width: 68px;
  text-align: end;
`;
const Do = styled.ol`
display: flex;
justify-content: space-between;
  flex-direction: column;
  margin-left: 12px;
  >li:nth-child(2){
    margin-top: 6px;
    color: ${theme.tingeFontColor}; 
    font-size: 14px;
  }

`;
const Info = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);

`;
const IconWrapper = styled.div`
     display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        >.icon{
          transition: .3s;
          border-radius: 50%;
          padding: 7.5px;
          fill:#fff;
          background: ${theme.themeColor};
          height: 42px;
          width: 42px;
          &.special{
            background: ${theme.special.themeColor};
          }
        }
`;

export {Info, IconWrapper, Do, Amount, Main, Wrapper,DelRecord};