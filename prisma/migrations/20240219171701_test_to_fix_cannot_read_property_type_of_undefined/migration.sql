-- CreateTable
CREATE TABLE `gamers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastTen` VARCHAR(255) NOT NULL,
    `mmr` DOUBLE NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `server` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kills_and_caps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caps` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `titan` INTEGER NULL,
    `match_gamer_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_f34p42nipgi334fgahcpwc7hu`(`match_gamer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_gamer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gamer_id` INTEGER NULL,
    `match_id` INTEGER NULL,
    `team_id` INTEGER NULL,

    INDEX `FK1ds5km99di58335h0art5ddsj`(`team_id`),
    INDEX `FKd4u9abhd09u33swxfvswa231k`(`gamer_id`),
    INDEX `FKg8cvpyt5dgciuklm33offk1do`(`match_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(6) NOT NULL,
    `map` INTEGER NOT NULL,
    `server` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flag_advantage` INTEGER NOT NULL,
    `win_or_loose` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kills_and_caps` ADD CONSTRAINT `FKtd2tjb6kpg1unyfjxqckingg8` FOREIGN KEY (`match_gamer_id`) REFERENCES `match_gamer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_gamer` ADD CONSTRAINT `FK1ds5km99di58335h0art5ddsj` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_gamer` ADD CONSTRAINT `FKd4u9abhd09u33swxfvswa231k` FOREIGN KEY (`gamer_id`) REFERENCES `gamers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_gamer` ADD CONSTRAINT `FKg8cvpyt5dgciuklm33offk1do` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
