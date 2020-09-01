import React from 'react';

const useUpdate=(fn:()=>void,deps:any[])=>{
  const count = React.useRef<number>(0);

  React.useEffect(() => {
    count.current += 1;
  }, deps);

  React.useEffect(() => {
    if (count.current <= 1) return;
    fn()
  }, deps);

}
export default useUpdate