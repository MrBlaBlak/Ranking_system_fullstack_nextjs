import {Weapon} from "@prisma/client";

export const calculateDamageBreakpoints = (weapon: Weapon) => {
    const dataPoints = [
        {distance: weapon.nearDistance, damage: weapon.nearDamage},
        {distance: weapon.midDistance, damage: weapon.midDamage},
        {distance: weapon.farDistance, damage: weapon.farDamage},
    ];
    const damageBreakpoints = dataPoints.map(point => ({x: point.distance, y: point.damage}))
    damageBreakpoints.unshift({x: 0, y: weapon.nearDamage});
    damageBreakpoints.push({x: 4000, y: weapon.farDamage})
    return damageBreakpoints
}
export const calculateTTKBreakpoints = (weapon: Weapon, health: number) => {
    const dataPoints = [

        {distance: weapon.nearDistance, damage: weapon.nearDamage},
        {distance: weapon.midDistance, damage: weapon.midDamage},
        {distance: weapon.farDistance, damage: weapon.farDamage},
    ];
    const breakpoints = [];
    breakpoints.push({x: 0, y: weapon.nearDamage});
    breakpoints.push({x: weapon.nearDistance, y: weapon.nearDamage});
    for (let i = 0; i < dataPoints.length - 1; i++) {
        const point1 = dataPoints[i];
        const point2 = dataPoints[i + 1];

        const min_bullet_to_kill_at_given_range = Math.ceil(health / point1.damage);
        const max_bullet_to_kill_at_given_range = Math.ceil(health / point2.damage);
        const step = (point2.distance - point1.distance) / (point1.damage - point2.damage)

        for (let i = min_bullet_to_kill_at_given_range; i < max_bullet_to_kill_at_given_range; i++) {
            const damageBreakpoint = Math.ceil(health / i);
            const distanceBreakpoint = point1.distance + step * (point1.damage - damageBreakpoint);

            breakpoints.push({x: distanceBreakpoint, y: damageBreakpoint});
        }
    }
    breakpoints.push({x: weapon.farDistance, y: weapon.farDamage})
    breakpoints.push({x: 4000, y: weapon.farDamage})
    const fireRatePerSecond = weapon.fireRate / 60;
    const ttkBreakpoints = breakpoints.map(point => {
        const bullets = Math.ceil(health / point.y);
        let ttk = bullets / fireRatePerSecond;

        if (weapon.name === "Hemlok" ) {
            ttk += Math.floor((bullets-1)/3) * 0.25;
        }
        return {x: point.x, y: ttk};
    });
    return ttkBreakpoints;

}
export const mergeBreakpoints = (breakpoints1: { x: number, y: number }[], breakpoints2: { x: number, y: number }[]) => {
    const allXValues = Array.from(new Set([...breakpoints1.map(bp => bp.x), ...breakpoints2.map(bp => bp.x)]));
    allXValues.sort((a, b) => a - b);

    const mergedBreakpoints1 = allXValues.map(x => {
        const point = breakpoints1.find(bp => bp.x === x);
        return { x, y: point ? point.y : null };
    });

    const mergedBreakpoints2 = allXValues.map(x => {
        const point = breakpoints2.find(bp => bp.x === x);
        return { x, y: point ? point.y : null };
    });

    return [mergedBreakpoints1, mergedBreakpoints2];
};

