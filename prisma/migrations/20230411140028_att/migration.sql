-- AlterTable
ALTER TABLE `compra` MODIFY `data_compra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `data_entrega` DATETIME(3) NULL;
