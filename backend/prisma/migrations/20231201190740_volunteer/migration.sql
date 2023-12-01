/*
  Warnings:

  - You are about to drop the column `volunteerId` on the `VolunteerTask` table. All the data in the column will be lost.
  - You are about to drop the `Volunteer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VolunteerTask` DROP FOREIGN KEY `VolunteerTask_volunteerId_fkey`;

-- AlterTable
ALTER TABLE `VolunteerTask` DROP COLUMN `volunteerId`,
    ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `Volunteer`;

-- AddForeignKey
ALTER TABLE `VolunteerTask` ADD CONSTRAINT `VolunteerTask_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
