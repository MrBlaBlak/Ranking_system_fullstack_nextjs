import {titanOptions, mapOptions} from './mapsAndTitans'
export const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
 export const getRandomStats = () => ({
     elims: getRandomValue(15, 40).toString(),
     flags: getRandomValue(0, 2).toString(),
     titans: titanOptions[getRandomValue(0, titanOptions.length - 1)].value,
 });
 export const getRandomMap = () => ({
     mapPlayed: mapOptions[getRandomValue(0, mapOptions.length - 1)].value
 })