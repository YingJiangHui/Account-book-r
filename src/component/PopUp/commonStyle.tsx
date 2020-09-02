import styled from 'styled-components';
import theme from '../../theme';

const Wrapper = styled.section`
  
  width: 100vw;
  background: #fff;
  border-radius: 10px 10px 0 0;
  padding: 16px;
  z-index: 6;
  position: fixed;
  left: 0;
  top: 100%;
  transition: transform .2s;
  
  &.move{
    animation: move .3s forwards;
  }
  
  >p{
    margin-top: 16px;
    font-size: 14px;
    color: ${theme.tingeFontColor};
  }
  >input[type=text]{
  &::-webkit-input-placeholder{
    color: ${theme.tingeFontColor};
  }
    font-size: 17px;
    width: 100%;
    margin-top: 20px;
    height: 48px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
`;

export {Wrapper}