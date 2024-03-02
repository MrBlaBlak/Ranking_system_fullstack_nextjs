/*
  Warnings:

  - You are about to alter the column `titan` on the `kills_and_caps` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.
  - You are about to alter the column `map` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `kills_and_caps` MODIFY `titan` ENUM('ion', 'tone', 'ronin', 'northstar', 'monarch', 'legion', 'scorch', 'none') NULL;

-- AlterTable
ALTER TABLE `matches` MODIFY `map` ENUM('boomtown', 'exo', 'eden', 'drydock', 'angel', 'colony', 'glitch', 'none') NOT NULL;
