/*
  Warnings:

  - You are about to drop the column `userId` on the `Mission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Mission` DROP FOREIGN KEY `Mission_userId_fkey`;

-- AlterTable
ALTER TABLE `Mission` DROP COLUMN `userId`;
