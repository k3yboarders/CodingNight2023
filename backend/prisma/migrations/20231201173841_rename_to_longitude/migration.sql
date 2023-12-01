/*
  Warnings:

  - You are about to drop the column `longtitude` on the `Ambulance` table. All the data in the column will be lost.
  - You are about to drop the column `longtitude` on the `DangerousPlace` table. All the data in the column will be lost.
  - You are about to drop the column `longtitude` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `longtitude` on the `Task` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `DangerousPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ambulance` DROP COLUMN `longtitude`,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `DangerousPlace` DROP COLUMN `longtitude`,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Shelter` DROP COLUMN `longtitude`,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `longtitude`,
    ADD COLUMN `longitude` DOUBLE NOT NULL;
