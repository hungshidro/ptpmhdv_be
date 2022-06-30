/*
  Warnings:

  - You are about to drop the column `service_id` on the `class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_id]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_service_id_fkey`;

-- AlterTable
ALTER TABLE `class` DROP COLUMN `service_id`;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `class_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Service_class_id_key` ON `Service`(`class_id`);

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
