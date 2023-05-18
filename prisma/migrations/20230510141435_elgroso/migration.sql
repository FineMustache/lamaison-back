-- AlterTable
ALTER TABLE `compra` ADD COLUMN `pago` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `verificado` BOOLEAN NOT NULL DEFAULT false;
