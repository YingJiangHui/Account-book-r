import styled from 'styled-components';
import {FC, memo, useEffect} from 'react';
import React from 'react';

const Wrapper = styled.section`
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    span{
    font-size: 24px;
    font-weight: bold;
      margin-right: 10px;
      font-weight: bold;
    }
    .output{
      font-weight: bold;
      font-size: 36px;
    }
`;

type Props = {
  defaultValue?:string;
  value: string,
  onChange: (value: number) => void,
  onSubmit: () => void
}

const Output: FC<Props> =memo( (props) => {
  const {defaultValue}= props
  const [output, setOutput] = React.useState('0');

  useEffect(()=>{
    if(defaultValue)
    setOutput(defaultValue)
  },[defaultValue])
  React.useEffect(() => {
    props.onChange(parseFloat(output));
    switch (props.value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        const num= output.split('.')
        //不超过百万 小数点不过两位判断条件
        if((num[0].length===6&&output.indexOf('.') === -1)||(num[1]&&num[1].length===2))
          break;
        if (output === '0') {
          setOutput(props.value);
        } else {
          setOutput(output + props.value);
        }
        break;
      case '.':
        if (output.indexOf('.') === -1) {
          setOutput(output + props.value);
        }
        break;
      case 'removeOnly':
        setOutput(output.slice(0, -1) || '0');
        break;
      case 'clear':
        setOutput('0');
        break;
      case '确定':
        if (output !== '0') {
          props.onSubmit();
        }
        break;

    }
  }, [props.value]);

  return (
    <Wrapper>
      <span>￥</span>
      <div className='output'>{output}</div>
    </Wrapper>
  );
});
export default Output;