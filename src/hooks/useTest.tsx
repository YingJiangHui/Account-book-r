import {useState} from 'react';

export interface Action {
  add:(value:number)=>void,
  print:()=>void,
  count:number[],
  setCount:(value: number[])=>void
}

const useTest = ():Action=>{
  const [count,setCount] =useState<number[]>([])

  const add = (item:number)=>{
    setCount((count)=>[...count,item])
  }
  const print = ()=>{
    for (let item of count){
      console.log(item)
    }
  }
  return{
    add,
    print,
    count,
    setCount
  }
}
export default useTest