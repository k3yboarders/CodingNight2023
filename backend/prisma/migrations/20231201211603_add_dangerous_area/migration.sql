-- CreateTable
CREATE TABLE `DangerousArea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `type` ENUM('BOMBING', 'TERRORIST_ATTACK', 'EARTHQUAKE', 'TSUNAMI', 'TORNADO', 'FAMINE', 'ROAD_ACCIDENT') NOT NULL,
    `severity` INTEGER NOT NULL,
    `radius` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
