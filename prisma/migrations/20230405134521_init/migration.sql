/*
  Warnings:

  - Added the required column `mtl` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superficie` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` ADD COLUMN `mtl` VARCHAR(191) NOT NULL,
    ADD COLUMN `superficie` VARCHAR(191) NOT NULL;
