import React, {FC} from 'react';
import styled from 'styled-components';
import 'style/animation.scss';
import Tip from 'component/PopUp/Tip';
const Wrapper = styled.div`
background: rgba(0,0,0,0.66);
color: #fff;
padding: 8px 16px;
font-size: 18px;
border-radius: 5px;
position: absolute;
top: 30%;
left: 50%;
transform: translate(-50%,-50%);

`;

type Props = {
  text: string,
  show: boolean,
  onChange:(value:boolean)=>void
}
const HintBox: FC<Props> = ({show, text,onChange}) => {
  return (
      <Tip onChange={(value)=>onChange(value)} inProp={show} >
        <Wrapper>
          <span>{text}</span>
        </Wrapper>
      </Tip>

  );
};

export default HintBox;