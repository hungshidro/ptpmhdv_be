/*
  Warnings:

  - You are about to drop the column `name` on the `registeredservice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `registeredservice` DROP COLUMN `name`,
    ADD COLUMN `is_running` INTEGER NOT NULL DEFAULT 1;
