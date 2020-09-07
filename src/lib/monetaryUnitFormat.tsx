const monetaryUnit=(amount:number,unit:boolean)=>{
  let result:string ='';
  const interge = Math.floor(amount)
  let decimals=parseFloat((amount - interge).toFixed(2))
  result = amount.toString()
  if(decimals===0)
    result = result+'.00'

  if(interge/10000>=1&&unit)
    result = Math.floor(interge/10000)+decimals+'万'
  return result
}

export default monetaryUnit