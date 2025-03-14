/*
  Warnings:

  - You are about to alter the column `plo_name` on the `plo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(10)`.
  - You are about to drop the column `academic_id` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `academic_id` on the `target` table. All the data in the column will be lost.
  - You are about to alter the column `target_name` on the `target` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(10)`.
  - You are about to drop the `chitiettarget` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `plo_content` to the `Plo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturer_id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_content` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chitiettarget` DROP FOREIGN KEY `ChitietTarget_plo_id_fkey`;

-- DropForeignKey
ALTER TABLE `chitiettarget` DROP FOREIGN KEY `ChitietTarget_target_id_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_academic_id_fkey`;

-- DropForeignKey
ALTER TABLE `target` DROP FOREIGN KEY `Target_academic_id_fkey`;

-- DropIndex
DROP INDEX `Subject_academic_id_fkey` ON `subject`;

-- DropIndex
DROP INDEX `Target_academic_id_fkey` ON `target`;

-- AlterTable
ALTER TABLE `plo` ADD COLUMN `plo_content` VARCHAR(255) NOT NULL,
    MODIFY `plo_name` CHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `academic_id`,
    ADD COLUMN `lecturer_id` CHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `target` DROP COLUMN `academic_id`,
    ADD COLUMN `target_content` VARCHAR(255) NOT NULL,
    MODIFY `target_name` CHAR(10) NOT NULL;

-- DropTable
DROP TABLE `chitiettarget`;

-- CreateTable
CREATE TABLE `Academic_subject` (
    `academic_id` CHAR(10) NOT NULL,
    `subject_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`academic_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer` (
    `lecturer_id` CHAR(12) NOT NULL,
    `academic_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`lecturer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo_detail` (
    `plo_detail_id` CHAR(10) NOT NULL,
    `plo_detail_name` CHAR(10) NOT NULL,
    `plo_content` VARCHAR(255) NOT NULL,
    `plo_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`plo_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Target_Plo_Detail` (
    `subject_id` VARCHAR(10) NOT NULL,
    `target_id` VARCHAR(10) NOT NULL,
    `plo_details_id` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`subject_id`, `plo_details_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clo` (
    `clo_id` CHAR(10) NOT NULL,
    `clo_name` CHAR(10) NOT NULL,
    `clo_content` VARCHAR(255) NOT NULL,
    `target_id` VARCHAR(10) NOT NULL,
    `subject_id` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam_detail` (
    `clo_id` CHAR(10) NOT NULL,
    `question_name` VARCHAR(15) NOT NULL,
    `exam_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`exam_id`, `clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `exam_id` CHAR(10) NOT NULL,
    `exam_name` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `class_id` CHAR(10) NOT NULL,
    `class_name` VARCHAR(255) NOT NULL,
    `subject_id` CHAR(10) NOT NULL,
    `lecturer_id` CHAR(12) NOT NULL,

    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `role_id` INTEGER NOT NULL,
    `role_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_account` (
    `user_account_id` CHAR(12) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_account_email_key`(`email`),
    UNIQUE INDEX `User_account_phone_key`(`phone`),
    PRIMARY KEY (`user_account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `student_id` CHAR(12) NOT NULL,
    `academic_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `result_id` INTEGER NOT NULL,
    `score` DOUBLE NOT NULL,
    `student_id` CHAR(12) NOT NULL,
    `exam_id` CHAR(10) NOT NULL,
    `clo_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_detail` ADD CONSTRAINT `Plo_detail_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Target_Plo_Detail` ADD CONSTRAINT `Target_Plo_Detail_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Target_Plo_Detail` ADD CONSTRAINT `Target_Plo_Detail_plo_details_id_fkey` FOREIGN KEY (`plo_details_id`) REFERENCES `Plo_detail`(`plo_detail_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`lecturer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clo` ADD CONSTRAINT `Clo_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `Target`(`target_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_detail` ADD CONSTRAINT `Exam_detail_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`exam_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_detail` ADD CONSTRAINT `Exam_detail_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`lecturer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`exam_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
