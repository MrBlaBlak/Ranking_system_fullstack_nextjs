import {axisClasses} from "@mui/x-charts/ChartsAxis";
import {chartsGridClasses} from "@mui/x-charts/ChartsGrid";

const sx = () => ({

    [`& .${axisClasses.root}`]: {
        [`& .${axisClasses.tick}, & .${axisClasses.line}`]: {
            stroke: '#aaaaaa',
            strokeWidth: 1,
        },
        [`& .${axisClasses.tickLabel}, & .${axisClasses.label}`]: {
            fill: '#aaaaaa',
        },
    },
    [`& .${chartsGridClasses.line}`]: {strokeDasharray: '5 3', strokeWidth: 0.5, stroke: '#aaaaaa'},

})
const slotProps = {
    legend: {
        labelStyle: {
            fontSize: 14,
            fill: '#aaaaaa',
        },
    },
};
const grid = {vertical: true, horizontal: true};
export const chartProps = {
    slotProps,
    sx,
    grid,
    width: 700,
    height: 300,
};