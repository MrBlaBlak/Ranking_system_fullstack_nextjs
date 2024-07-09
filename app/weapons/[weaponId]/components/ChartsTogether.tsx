import React from 'react';
import {LineChart} from "@mui/x-charts";
import {chartProps} from "../utils/chartProps"
type Props = {
    damageBreakpoints: { x: number, y: number | null }[][]  ,
    ttkBreakpoints: { x: number, y: number | null }[][],

};
const ChartsTogether = ({damageBreakpoints, ttkBreakpoints}: Props) => {

    return (
        <>
            <LineChart
                xAxis={[{ data: (damageBreakpoints[0] || []).map(point => point.x), label: 'Distance' }]}
                series={[
                    {
                        data: (damageBreakpoints[0] || []).map(point => point.y),
                        connectNulls: true,
                        showMark: ({index}) => index > 0 && index < damageBreakpoints[0].length - 1,
                        label: 'Damage1',
                        curve: "linear",
                        color: '#fdb462'

                    },
                    {
                        data: (damageBreakpoints[1] || []).map(point => point.y),
                        connectNulls: true,
                        showMark: ({index}) => index > 0 && index < damageBreakpoints[1].length - 1,
                        label: 'Damage2',
                        curve: "linear",
                        color: '#aaaaaa'

                    }
                ]}
                yAxis={[{
                    min: 0,
                    max: 40,
                },]}
                {...chartProps}
            />
            <LineChart
                xAxis={[{ data: (ttkBreakpoints[0] || []).map(point => point.x), label: 'Distance' }]}
                series={[
                    {
                        data: (ttkBreakpoints[0] || []).map(point => point.y),
                        connectNulls: true,
                        showMark: ({index}) => index > 1 && index < ttkBreakpoints[0].length - 2,
                        label: 'TTK1',
                        curve: "stepBefore",
                        color: '#fdb462'
                    },
                    {
                        data: (ttkBreakpoints[1] || []).map(point => point.y),
                        connectNulls: true,
                        showMark: ({index}) => index > 1 && index < ttkBreakpoints[1].length - 2,
                        label: 'TTK2',
                        curve: "stepBefore",
                        color: '#aaaaaa'
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
export default ChartsTogether;