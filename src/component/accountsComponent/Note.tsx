import {FC} from 'react';
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import theme from 'theme';
import Cover from '../Cover';

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
  &.moveTo{
    transform: translateY(-100%);
  }
  &.moveOut{
    transform: translateY(100%);
  }
  >.note-control{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >li{
        &:nth-child(1){
          width: 50px;
            >.icon{
              width: 20px;
              height: 30px;
              fill:${theme.tingeFontColor};
            }
         }
        &:nth-child(3){
            width: 50px;
           color: ${theme.themeColor};
        }
      }
    }
  >p{
    margin-top: 16px;
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
  >.notes{
    margin-top: 20px;
    margin-bottom: 50px;
    >li{            
      background:#f1f1f1;
      color: #a9a9a9;
      font-size: 14px;
      font-weight: 100;
      border-radius: 25px;
      display: inline-block;
      padding: 5px 10px;
      margin-right:10px ;
      &.selected{
        background: ${theme.tingeColor};
        color: ${theme.themeColor};
        box-shadow: 0 0 2px ${theme.themeColor};
      }
    }
  }
`;
type Props = {
  value: string,
  className: string,
  onChange: (value: string) => void
  onChangeClass: () => void,
  maxLen: number
}
const Note: FC<Props> = (props) => {
  const [output, setOutput] = React.useState(props.value);
  const [notes, setNotes] = React.useState<string[]>([]);
  const refInput = React.useRef<HTMLInputElement>(null);
  const addNote = (note: string) => {
    if (notes.length >= 3)
      setNotes((notes) => notes.slice(0, -1));
    if (notes.indexOf(note) === -1)
      setNotes((notes) => [note].concat(notes));
  };
  const onEnsure = () => {
    const value = refInput.current?.value || '';
    props.onChange(value);
    props.onChangeClass();
    addNote(value);
  };
  React.useEffect(() => {
    if (props.className === 'moveTo') {
      refInput.current?.focus();
    }
  }, [props.className]);
  const onChange = (e: React.ChangeEvent) => {
    if(output.length<props.maxLen)
      setOutput((e.target as HTMLInputElement).value);

  };
  return (
    <Cover className={props.className}>
      <Wrapper className={props.className}>
        <ol className='note-control'>
          <li onClick={props.onChangeClass}><Icon name='left'/></li>
          <li>请添加备注</li>
          <li onClick={onEnsure}>确定</li>
        </ol>
        <input ref={refInput} onChange={onChange} value={output} type="text" placeholder='请输入备注内容'/>
        <p>{output.length}/{props.maxLen}</p>
        <ol className='notes'>
          {notes.map((item) => <li onClick={() => setOutput(item)} key={item}>{item}</li>)}
        </ol>
      </Wrapper>
    </Cover>
  );
};
export default Note;