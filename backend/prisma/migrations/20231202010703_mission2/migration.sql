/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Ambulance` table. All the data in the column will be lost.
  - Added the required column `ambulanceId` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Mission` DROP FOREIGN KEY `Mission_userId_fkey`;

-- AlterTable
ALTER TABLE `Ambulance` DROP COLUMN `isAvailable`;

-- AlterTable
ALTER TABLE `Mission` ADD COLUMN `ambulanceId` INTEGER NOT NULL,
    ADD COLUMN `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_ambulanceId_fkey` FOREIGN KEY (`ambulanceId`) REFERENCES `Ambulance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
