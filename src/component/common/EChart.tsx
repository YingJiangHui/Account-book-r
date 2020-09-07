import styled from 'styled-components';
import ReactEcharts from "echarts-for-react";
import React, {FC, useEffect, useRef} from 'react';

const Wrapper = styled.div`
overflow: auto;

`
type Props = {
  option:{},
  width:string
}
const EChart:FC<Props> = ({option,width})=>{
  const onChartReadyCallback = () => {

  };
  const EventsDict = {
    onClick:()=>{
    }
  };
  const chartWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = (chartWrapper.current as HTMLDivElement);
    if (div)
      div.scrollLeft = div.scrollWidth;
  }, [chartWrapper]);
  return(
    <Wrapper  ref={chartWrapper}>
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          onChartReady={onChartReadyCallback}
          onEvents={EventsDict}
          style={{height: '300px', width: width}}
          opts={{}}/>
    </Wrapper>
  )
}

export default EChart