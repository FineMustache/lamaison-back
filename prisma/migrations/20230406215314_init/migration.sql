/*
  Warnings:

  - You are about to drop the column `endereco_id` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `desconto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairro` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `desconto` DROP FOREIGN KEY `desconto_id_produto_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `usuario_endereco_id_fkey`;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `desconto` DOUBLE NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `endereco_id`,
    ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL,
    ADD COLUMN `rua` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `desconto`;

-- DropTable
DROP TABLE `endereco`;

-- CreateTable
CREATE TABLE `compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `data_compra` DATETIME(3) NOT NULL,
    `data_entrega` DATETIME(3) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra_produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_compra` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `qtde` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desejo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra_produto` ADD CONSTRAINT `compra_produto_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra_produto` ADD CONSTRAINT `compra_produto_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `desejo` ADD CONSTRAINT `desejo_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `desejo` ADD CONSTRAINT `desejo_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
