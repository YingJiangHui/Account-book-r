import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import PopUpHasSure from 'component/PopUp/popUpBoxComponent/PopUpHasSure';

const Container = styled.div`
  padding: 16px;
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
    height: 48px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
`;
type Props = {
  show: boolean
  value: string,
  placeholder: string,
  onChange: (value: string) => void
  maxLen: number,
  title: string,
  close: () => void
}
const PopUpInput: FC<Props> = memo((props) => {
  const {close} = props;
  const [output, setOutput] = React.useState(props.value);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.show);
  }, [props.show]);

  const refInput = React.useRef<HTMLInputElement>(null);

  const onEnsure = () => {
    if (output.length === 0) return;
    const value = refInput.current?.value || '';
    props.onChange(value);
    close()
  };
  React.useEffect(() => {
    refInput.current?.focus();
  },[]);
  const onChange = (e: React.ChangeEvent) => {
    if (output.length < props.maxLen)
      setOutput((e.target as HTMLInputElement).value);
  };
  return (
    <PopUpHasSure close={close} title={props.title} show={props.show} onEnsure={onEnsure}
                  disable={output.length === 0 ? true : false}>
      <Container>
        <input ref={refInput} onChange={onChange} value={output} type="text" placeholder={props.placeholder}/>
        <p>{output.length}/{props.maxLen}</p>
      </Container>
    </PopUpHasSure>
  );
});
export default PopUpInput;