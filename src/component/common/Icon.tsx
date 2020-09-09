import React from 'react';
import cs from 'classnames';
import styled from 'styled-components';
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icons', true, /\.svg$/));} catch (e) {console.log(e);}

const Wrapper = styled.svg`
`

type Props = {
  name?: string
  onClick?:()=>void
} & React.SVGAttributes<SVGElement>
const Icon = (props: Props) => {
  const {className, onClick,...rest} = props;
  return (
    <Wrapper onClick={onClick} className={cs('icon', className)}>
      {rest.name ? <use xlinkHref={'#' + rest.name}></use> : ''}
    </Wrapper>
  );
};
export default Icon;