/*
  Warnings:

  - You are about to drop the column `is_starting` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_code` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_student_id_fkey`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `is_starting`,
    DROP COLUMN `student_id`,
    ADD COLUMN `class_code` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `class`;

-- CreateTable
CREATE TABLE `RegisteredService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `day_of_week` INTEGER NOT NULL,
    `from` INTEGER NOT NULL,
    `to` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RegisteredService` ADD CONSTRAINT `RegisteredService_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegisteredService` ADD CONSTRAINT `RegisteredService_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
