'use client'
import React from 'react';
import {LineChart} from "@mui/x-charts";
import Weapon from '@/app/model/Weapon'

type Props = {
    weapon: Weapon,
};


const Chart = ({weapon}: Props) => {


    const health = 100;
    const dataPoints = [

        {distance: weapon.near_distance, damage: weapon.near_damage},
        {distance: weapon.mid_distance, damage: weapon.mid_damage},
        {distance: weapon.far_distance, damage: weapon.far_damage},
    ];

    const breakpoints = [];
    breakpoints.push({x: 0, y: weapon.near_damage});
    breakpoints.push({x: weapon.near_distance, y: weapon.near_damage});
    for (let i = 0; i < dataPoints.length - 1; i++) {
        const point1 = dataPoints[i];
        const point2 = dataPoints[i + 1];

        const min_bullet_to_kill_at_given_range = Math.ceil(health / point1.damage);
        const max_bullet_to_kill_at_given_range = Math.ceil(health / point2.damage);
        const step = (point2.distance-point1.distance)/(point1.damage-point2.damage)
        let counter= 0
        for (let i = min_bullet_to_kill_at_given_range; i < max_bullet_to_kill_at_given_range; i++) {
            const damageBreakpoint = Math.ceil(health/i);
            const distanceBreakpoint = point1.distance+step*(point1.damage-damageBreakpoint);
            breakpoints.push({x: distanceBreakpoint, y: damageBreakpoint});
            counter++;
        }
    }
    breakpoints.push({x: weapon.far_distance, y: weapon.far_damage})
    breakpoints.push({x: 4000, y: weapon.far_damage})
    const fireRatePerSecond = weapon.fire_rate / 60;
    const ttkBreakpoints = breakpoints.map(point => {
        const bullets = Math.ceil(health / point.y);
        const ttk = bullets / fireRatePerSecond;
        return { x: point.x, y: ttk };
    });


    return (
        <div >
            <LineChart
                xAxis={[{data: breakpoints.map(point => point.x), label: 'Distance'}] }
                series={[
                    {
                        data: breakpoints.map(point => point.y),
                        showMark: ({ index }) => index > 1 && index < ttkBreakpoints.length - 2,
                        label: 'Damage',
                        curve: "linear"
                    }

                ]}
                yAxis={[ {
                    min: 0,
                    max: 40,
                },]}
                width={700}
                height={300}
            />
            <LineChart
                xAxis={[{ data: ttkBreakpoints.map(point => point.x), label: 'Distance' }]}
                series={[
                    {
                        data: ttkBreakpoints.map(point => point.y),
                        showMark: ({ index }) => index > 1 && index < ttkBreakpoints.length - 2,
                        label: 'TTK',
                        curve: "stepBefore"
                    }
                ]}
                yAxis={[{
                    min: 0,
                }]}
                width={700}
                height={300}
            />
        </div>)
};
export default Chart;