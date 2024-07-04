import React from 'react';
import {LineChart} from "@mui/x-charts";

type Props = {
    damageBreakpoints: { x: number, y: number }[],
    ttkBreakpoints: { x: number, y: number }[],
};
const Charts = ({damageBreakpoints, ttkBreakpoints}: Props) => {
    return (
        <>
            <LineChart
                xAxis={[{data: damageBreakpoints.map(point => point.x), label: 'Distance'}]}
                series={[
                    {
                        data: damageBreakpoints.map(point => point.y),
                        showMark: ({index}) => index > 0 && index < damageBreakpoints.length - 1,
                        label: 'Damage',
                        curve: "linear"
                    }
                ]}
                yAxis={[{
                    min: 0,
                    max: 40,
                },]}
                width={700}
                height={300}
            />
            <LineChart
                xAxis={[{data: ttkBreakpoints.map(point => point.x), label: 'Distance'}]}
                series={[
                    {
                        data: ttkBreakpoints.map(point => point.y),
                        showMark: ({index}) => index > 1 && index < ttkBreakpoints.length - 2,
                        label: 'TTK',
                        curve: "stepBefore"
                    }
                ]}
                yAxis={[{
                    min: 0,
                    max: 1,
                }]}
                width={700}
                height={300}
            />
        </>
    )
};
export default Charts;