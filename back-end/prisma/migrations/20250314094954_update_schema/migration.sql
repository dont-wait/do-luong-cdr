/*
  Warnings:

  - You are about to drop the column `class_name` on the `class` table. All the data in the column will be lost.
  - The primary key for the `clo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `clo_id` on the `clo` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Int`.
  - The primary key for the `exam_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question_name` on the `exam_detail` table. All the data in the column will be lost.
  - You are about to alter the column `clo_id` on the `exam_detail` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Int`.
  - The primary key for the `plo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `plo_id` on the `plo` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Int`.
  - You are about to alter the column `plo_id` on the `plo_detail` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Int`.
  - The primary key for the `result` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `clo_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Int`.
  - You are about to drop the column `email` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the `target` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `target_plo_detail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `degree_id` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clo` DROP FOREIGN KEY `Clo_target_id_fkey`;

-- DropForeignKey
ALTER TABLE `exam_detail` DROP FOREIGN KEY `Exam_detail_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `plo_detail` DROP FOREIGN KEY `Plo_detail_plo_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `target` DROP FOREIGN KEY `Target_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `target_plo_detail` DROP FOREIGN KEY `Target_Plo_Detail_plo_details_id_fkey`;

-- DropForeignKey
ALTER TABLE `target_plo_detail` DROP FOREIGN KEY `Target_Plo_Detail_subject_id_fkey`;

-- DropIndex
DROP INDEX `Clo_target_id_fkey` ON `clo`;

-- DropIndex
DROP INDEX `Exam_detail_clo_id_fkey` ON `exam_detail`;

-- DropIndex
DROP INDEX `Plo_detail_plo_id_fkey` ON `plo_detail`;

-- DropIndex
DROP INDEX `Result_clo_id_fkey` ON `result`;

-- DropIndex
DROP INDEX `User_account_email_key` ON `user_account`;

-- DropIndex
DROP INDEX `User_account_phone_key` ON `user_account`;

-- AlterTable
ALTER TABLE `class` DROP COLUMN `class_name`;

-- AlterTable
ALTER TABLE `clo` DROP PRIMARY KEY,
    MODIFY `clo_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`clo_id`);

-- AlterTable
ALTER TABLE `exam_detail` DROP PRIMARY KEY,
    DROP COLUMN `question_name`,
    MODIFY `clo_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`exam_id`, `clo_id`);

-- AlterTable
ALTER TABLE `lecturer` ADD COLUMN `degree_id` CHAR(10) NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(15) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(50) NOT NULL,
    ADD COLUMN `phone` CHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `plo` DROP PRIMARY KEY,
    MODIFY `plo_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`plo_id`);

-- AlterTable
ALTER TABLE `plo_detail` MODIFY `plo_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `result` DROP PRIMARY KEY,
    MODIFY `result_id` VARCHAR(191) NOT NULL,
    MODIFY `clo_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`result_id`);

-- AlterTable
ALTER TABLE `student` ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `phone` CHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `user_account` DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `phone`;

-- DropTable
DROP TABLE `target`;

-- DropTable
DROP TABLE `target_plo_detail`;

-- CreateTable
CREATE TABLE `Plo_clo` (
    `plo_id` INTEGER NOT NULL,
    `clo_id` INTEGER NOT NULL,

    PRIMARY KEY (`plo_id`, `clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Degree` (
    `degree_id` CHAR(10) NOT NULL,
    `degree_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`degree_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_email_key` ON `Lecturer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_phone_key` ON `Lecturer`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_phone_key` ON `Student`(`phone`);

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `Degree`(`degree_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_detail` ADD CONSTRAINT `Plo_detail_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clo` ADD CONSTRAINT `Clo_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_detail` ADD CONSTRAINT `Exam_detail_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
