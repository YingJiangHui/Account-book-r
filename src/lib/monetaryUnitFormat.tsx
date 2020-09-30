const monetaryUnit=(amount:number,unit:boolean)=>{
  if(!amount)return '0.00'
  let strAmount = amount.toString()
  let decimals = (strAmount.split('.')[1]||'')
  const interge = strAmount.split('.')[0]
  let zero = ''
  if(decimals&&decimals.length===1){
      decimals='.'+decimals
      zero='0'
  }else if(!decimals){
    zero='.00'
  }else{
    decimals='.'+decimals
  }
  decimals = decimals.substr(0,3)

  if(interge.length>=5&&unit)
    return strAmount.substr(0,interge.length-4)+decimals+zero+'万'

  return strAmount+zero
}

export default monetaryUnit