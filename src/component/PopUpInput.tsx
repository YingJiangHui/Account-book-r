import {FC, memo} from 'react';
import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import theme from 'theme';
import Cover from './Cover';
import '../keyframes.scss';
import {Wrapper} from 'component/PopUp/commonStyle'
const List = styled.ol`
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
        background: ${theme.tingeColorOpacity};
        color: ${theme.themeColor};
        box-shadow: 0 0 2px ${theme.themeColor};
      }
    }
`
const Control = styled.ol`
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
        &.disable-click{
           color: ${theme.tingeColor};
        }
      }
`
type Props = {
  value: string,
  placeholder:string,
  onChange: (value: string) => void
  onChangeClass: () => void,
  maxLen: number,
  title:string
}
const PopUpInput: FC<Props> = memo((props) => {
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
    if(output.length===0)return;
    const value = refInput.current?.value || '';
    props.onChange(value);
    props.onChangeClass();
    addNote(value);
  };
  React.useEffect(() => {
      refInput.current?.focus();
  });
  const onChange = (e: React.ChangeEvent) => {
    if(output.length<props.maxLen)
      setOutput((e.target as HTMLInputElement).value);
  };
  return (
    <Cover className='move'>
      <Wrapper className='move'>
          <Control>
            <li onClick={props.onChangeClass}><Icon name='left'/></li>
            <li>{props.title}</li>
            <li onClick={onEnsure} className={output.length===0?'disable-click':''}>确定</li>
          </Control>
        <input ref={refInput} onChange={onChange} value={output} type="text" placeholder={props.placeholder}/>
        <p>{output.length}/{props.maxLen}</p>
        <List>
          {notes.map((item) => <li onClick={() => setOutput(item)} key={item}>{item}</li>)}
        </List>
      </Wrapper>
    </Cover>
  );
});
export default PopUpInput;