/*
  Warnings:

  - Added the required column `lecturer_subject_manager_id` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subject` ADD COLUMN `lecturer_subject_manager_id` VARCHAR(191) NOT NULL;
