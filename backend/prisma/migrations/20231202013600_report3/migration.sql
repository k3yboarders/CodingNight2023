/*
  Warnings:

  - You are about to drop the `Mission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ambulanceId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Mission` DROP FOREIGN KEY `Mission_ambulanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Mission` DROP FOREIGN KEY `Mission_reportId_fkey`;

-- AlterTable
ALTER TABLE `Report` ADD COLUMN `ambulanceId` INTEGER NOT NULL,
    ADD COLUMN `isCompleted` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Mission`;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_ambulanceId_fkey` FOREIGN KEY (`ambulanceId`) REFERENCES `Ambulance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
