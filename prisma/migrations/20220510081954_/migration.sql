/*
  Warnings:

  - You are about to drop the column `class_id` on the `service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[service_id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `service_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_class_id_fkey`;

-- AlterTable
ALTER TABLE `class` ADD COLUMN `service_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `class_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Class_service_id_key` ON `Class`(`service_id`);

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
