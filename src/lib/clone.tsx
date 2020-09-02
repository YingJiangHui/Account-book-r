const clone = (data:any):any=>{
  return JSON.parse(JSON.stringify(data));
}
export default clone