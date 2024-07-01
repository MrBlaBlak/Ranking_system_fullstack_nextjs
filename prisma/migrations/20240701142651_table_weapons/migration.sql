-- CreateTable
CREATE TABLE `weapons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `weapon_class` VARCHAR(255) NOT NULL,
    `near_damage` INTEGER NOT NULL,
    `mid_damage` INTEGER NOT NULL,
    `far_damage` INTEGER NOT NULL,
    `near_distance` INTEGER NOT NULL,
    `mid_distance` INTEGER NOT NULL,
    `far_distance` INTEGER NOT NULL,
    `fire_rate` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
