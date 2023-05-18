/*
  Warnings:

  - Added the required column `medidas` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` ADD COLUMN `medidas` VARCHAR(191) NOT NULL;
