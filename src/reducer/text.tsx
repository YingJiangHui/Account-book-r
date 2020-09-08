import React, {} from 'react';
interface AccountState {
  n:number
}
const initial:AccountState= {
  n:0
}

type ReducerAction =
  {
  type:string;
};




const testReducer = (state:AccountState,action:ReducerAction):AccountState=>{
  switch (action.type) {
    case 'add':
      return state={n:state.n+1}
  }
  return {n:state.n}
}


export {
  testReducer,
  initial,
}
