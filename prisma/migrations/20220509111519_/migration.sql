/*
  Warnings:

  - You are about to drop the column `stu_id` on the `service` table. All the data in the column will be lost.
  - Added the required column `name` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_stu_id_fkey`;

-- AlterTable
ALTER TABLE `class` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `stu_id`,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
