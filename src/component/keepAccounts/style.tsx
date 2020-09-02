import styled from 'styled-components';

const Options = styled.div`
  padding: 16px;
`;
const Wrapper = styled.div`
  z-index: 1;
  width: 100vw;
  transition: .3s;
  top:100%;
  left: 0;
  border-radius: 10px 10px 0 0;
  background: #fff;
  position: fixed;
 &.moveTo{
      transform: translateY(-100%);
  }
  &.moveOut{
      transform: translateY(0);
  }
`;

export {
  Options,
  Wrapper
}