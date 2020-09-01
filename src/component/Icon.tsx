import React from 'react';
import cs from 'classnames';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icons', true, /\.svg$/));} catch (e) {console.log(e);}

type Props = {
  name?: string
} & React.SVGAttributes<SVGElement>
const Icon = (props: Props) => {
  const {className, ...rest} = props;
  return (
    <svg className={cs('icon',className)}>
      {rest.name ? <use xlinkHref={'#' + rest.name}></use> : ''}
    </svg>
  );
};
export default Icon;