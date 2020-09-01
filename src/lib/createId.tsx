import React from 'react'
let id = parseInt(window.localStorage.getItem('maxId')||'0');

const createId = ():number=>{
  id+=1;
  window.localStorage.setItem('maxId',id.toString());
  return id;
}
export default createId