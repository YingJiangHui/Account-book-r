import {FC, memo, useEffect, useRef} from 'react';
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
  isVisible:(value:boolean)=>void
}
const PopUpInput: FC<Props> = memo((props) => {
  const {close,isVisible} = props;
  const [output, setOutput] = React.useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setOutput(props.value)
  },[props.value])
  const onEnsure = () => {
    if (output.length === 0) return;
    const value = inputEl.current?.value || '';
    props.onChange(value);
    close()
  };
  useEffect(()=>{
    if(props.show)
      setTimeout(()=>{
        inputEl.current?.focus();
      },260)
    else
      inputEl.current?.blur();
  },[props.show])
  const onChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value
    if (value.length <= props.maxLen)
      setOutput(value);
  };

  return (
    <PopUpHasSure close={close} title={props.title} show={props.show} onEnsure={onEnsure}
                  disable={output.length === 0} isVisible={(value:boolean)=>{isVisible(value)}}>
      <Container>
        <input ref={inputEl} onChange={onChange} value={output} type="text" placeholder={props.placeholder}/>
        <p>{output.length}/{props.maxLen}</p>
      </Container>
    </PopUpHasSure>
  );
});
export default PopUpInput;