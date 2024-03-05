/*
  Warnings:

  - The values [ion,tone,ronin,northstar,monarch,legion,scorch,none] on the enum `kills_and_caps_titan` will be removed. If these variants are still used in the database, this will fail.
  - The values [boomtown,exo,eden,drydock,angel,colony,glitch,none] on the enum `matches_map` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `kills_and_caps` MODIFY `titan` ENUM('Ion', 'Tone', 'Ronin', 'Northstar', 'Monarch', 'Legion', 'Scorch', 'None') NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `map` ENUM('Boomtown', 'Exo', 'Eden', 'Drydock', 'Angel', 'Colony', 'Glitch', 'None') NOT NULL;
