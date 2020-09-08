const monetaryUnit=(amount:number,unit:boolean)=>{
  // let result:string ='';
  // let decimals=parseFloat((amount - interge).toFixed(2))
  // result = amount.toString()
  // let zero = '';
  // if(decimals===0)
  //   zero='.00'
  //
  // if(interge/10000>=1&&unit)
  //   return Math.floor(interge/10000)+decimals+zero+'万'
  // return result+zero
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