-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_ambulanceId_fkey`;

-- AlterTable
ALTER TABLE `Report` MODIFY `ambulanceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_ambulanceId_fkey` FOREIGN KEY (`ambulanceId`) REFERENCES `Ambulance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
