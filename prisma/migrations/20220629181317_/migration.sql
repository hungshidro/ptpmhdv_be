/*
  Warnings:

  - A unique constraint covering the columns `[class_code]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Service_class_code_key` ON `Service`(`class_code`);
