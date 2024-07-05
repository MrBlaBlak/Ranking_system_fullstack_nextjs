import React from 'react';
import {LineChart} from "@mui/x-charts";
import {axisClasses} from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
type Props = {
    damageBreakpoints: { x: number, y: number }[],
    ttkBreakpoints: { x: number, y: number }[],

};
const Charts = ({damageBreakpoints, ttkBreakpoints}: Props) => {
    const sx= () => ({

        [`& .${axisClasses.root}`]: {
            [`& .${axisClasses.tick}, & .${axisClasses.line}`]: {
                stroke: '#aaaaaa',
                strokeWidth: 1,
            },
            [`& .${axisClasses.tickLabel}, & .${axisClasses.label}`]: {
                fill: '#aaaaaa',
            },
        },
        [`& .${chartsGridClasses.line}`]: { strokeDasharray: '5 3', strokeWidth: 0.5, stroke: '#aaaaaa' },

    })
    const slotProps={
        legend: {
            labelStyle: {
                fontSize: 14,
                fill: '#aaaaaa',
            },
        },
    };
    const grid = {vertical: true, horizontal: true};
    const chartProps = {
        slotProps,
        sx,
        grid,
        width: 700,
        height: 300,
    };
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