import React from 'react'

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icons', true, /\.svg$/));} catch (e) {console.log(e);}

type Props = {
  name:string
}
const Icon=(props:Props)=>{
  return (
    <svg className='icon'>
      <use xlinkHref={'#'+props.name}></use>
    </svg>
  )
}
export default Icon