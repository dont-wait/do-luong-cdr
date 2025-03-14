/*
  Warnings:

  - The primary key for the `degree` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `degree_id` on the `degree` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `exam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `exam_id` on the `exam` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `exam_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `exam_id` on the `exam_detail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `degree_id` on the `lecturer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `exam_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `exam_detail` DROP FOREIGN KEY `Exam_detail_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `lecturer` DROP FOREIGN KEY `Lecturer_degree_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_exam_id_fkey`;

-- DropIndex
DROP INDEX `Lecturer_degree_id_fkey` ON `lecturer`;

-- DropIndex
DROP INDEX `Result_exam_id_fkey` ON `result`;

-- AlterTable
ALTER TABLE `degree` DROP PRIMARY KEY,
    MODIFY `degree_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`degree_id`);

-- AlterTable
ALTER TABLE `exam` DROP PRIMARY KEY,
    MODIFY `exam_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`exam_id`);

-- AlterTable
ALTER TABLE `exam_detail` DROP PRIMARY KEY,
    MODIFY `exam_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`exam_id`, `clo_id`);

-- AlterTable
ALTER TABLE `lecturer` MODIFY `degree_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `result` MODIFY `exam_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    UNIQUE INDEX `Admin_phone_key`(`phone`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `Degree`(`degree_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_detail` ADD CONSTRAINT `Exam_detail_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`exam_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`exam_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
