


const generator = (key:string)=>{
  let id:number = parseInt(window.localStorage.getItem(key)||'0');
  const createId = ():number=>{
    id+=1;
    window.localStorage.setItem(key,id.toString());
    return id
  }
  return {
    createId
  }
}

export default generator