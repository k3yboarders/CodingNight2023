-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `type` ENUM('BOMBING', 'TERRORIST_ATTACK', 'EARTHQUAKE', 'TSUNAMI', 'TORNADO', 'FAMINE', 'ROAD_ACCIDENT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;