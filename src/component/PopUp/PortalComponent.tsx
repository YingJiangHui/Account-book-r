import React, {FC, memo} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const Wrapper = styled.div`
`
type Props = {}
const PortalComponent: FC<Props> = memo(({children}) => {
  const  root= document.querySelector('body') as HTMLBodyElement
  ;
  return (
    <Wrapper>
      {ReactDOM.createPortal(children, root)}
    </Wrapper>
  )
});


export default PortalComponent;