import React from 'react';
import {LineChart} from "@mui/x-charts";
import {chartProps} from "../utils/chartProps"
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
                        curve: "linear",
                        color: '#fdb462'

                    }
                ]}
                yAxis={[{
                    min: 0,
                    max: 40,
                },]}
                {...chartProps}
            />
            <LineChart
                xAxis={[{data: ttkBreakpoints.map(point => point.x), label: 'Distance'}]}
                series={[
                    {
                        data: ttkBreakpoints.map(point => point.y),
                        showMark: ({index}) => index > 1 && index < ttkBreakpoints.length - 2,
                        label: 'TTK',
                        curve: "stepBefore",
                        color: '#fdb462'
                    },

                ]}
                yAxis={[{
                    min: 0,
                    max: 1,
                }]}
                {...chartProps}
            />
        </>
    )
};
export default Charts;