/*
  Warnings:

  - The primary key for the `Academic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academic_id` on the `Academic` table. All the data in the column will be lost.
  - The primary key for the `Academic_subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_id` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Clo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clo_id` on the `Clo` table. All the data in the column will be lost.
  - The primary key for the `Degree` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `degree_id` on the `Degree` table. All the data in the column will be lost.
  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `department_id` on the `Department` table. All the data in the column will be lost.
  - The primary key for the `Exam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `exam_id` on the `Exam` table. All the data in the column will be lost.
  - The primary key for the `Lecturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lecturer_id` on the `Lecturer` table. All the data in the column will be lost.
  - The primary key for the `Plo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `plo_id` on the `Plo` table. All the data in the column will be lost.
  - The primary key for the `Plo_clo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Plo_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `plo_detail_id` on the `Plo_detail` table. All the data in the column will be lost.
  - The primary key for the `Result` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clo_id` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `exam_id` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `result_id` on the `Result` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_id` on the `Subject` table. All the data in the column will be lost.
  - The primary key for the `User_account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_account_id` on the `User_account` table. All the data in the column will be lost.
  - You are about to drop the `Exam_detail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Academic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Clo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `Degree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Department` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Exam` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Plo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `Plo_detail` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Result` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `question_id` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User_account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Academic` DROP FOREIGN KEY `Academic_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `Academic_subject` DROP FOREIGN KEY `Academic_subject_academic_id_fkey`;

-- DropForeignKey
ALTER TABLE `Academic_subject` DROP FOREIGN KEY `Academic_subject_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_lecturer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `Clo` DROP FOREIGN KEY `Clo_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `Exam` DROP FOREIGN KEY `Exam_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `Exam_detail` DROP FOREIGN KEY `Exam_detail_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Exam_detail` DROP FOREIGN KEY `Exam_detail_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `Lecturer` DROP FOREIGN KEY `Lecturer_academic_id_fkey`;

-- DropForeignKey
ALTER TABLE `Lecturer` DROP FOREIGN KEY `Lecturer_degree_id_fkey`;

-- DropForeignKey
ALTER TABLE `Plo` DROP FOREIGN KEY `Plo_academic_id_fkey`;

-- DropForeignKey
ALTER TABLE `Plo_clo` DROP FOREIGN KEY `Plo_clo_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Plo_clo` DROP FOREIGN KEY `Plo_clo_plo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Plo_detail` DROP FOREIGN KEY `Plo_detail_plo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_exam_id_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_academic_id_fkey`;

-- DropForeignKey
ALTER TABLE `Subject` DROP FOREIGN KEY `Subject_lecturer_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_account` DROP FOREIGN KEY `User_account_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_account` DROP FOREIGN KEY `User_account_lecturer_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_account` DROP FOREIGN KEY `User_account_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_account` DROP FOREIGN KEY `User_account_student_id_fkey`;

-- DropIndex
DROP INDEX `Academic_department_id_fkey` ON `Academic`;

-- DropIndex
DROP INDEX `Academic_subject_subject_id_fkey` ON `Academic_subject`;

-- DropIndex
DROP INDEX `Admin_admin_id_key` ON `Admin`;

-- DropIndex
DROP INDEX `Class_lecturer_id_fkey` ON `Class`;

-- DropIndex
DROP INDEX `Class_subject_id_fkey` ON `Class`;

-- DropIndex
DROP INDEX `Clo_subject_id_fkey` ON `Clo`;

-- DropIndex
DROP INDEX `Exam_class_id_fkey` ON `Exam`;

-- DropIndex
DROP INDEX `Lecturer_academic_id_fkey` ON `Lecturer`;

-- DropIndex
DROP INDEX `Lecturer_degree_id_fkey` ON `Lecturer`;

-- DropIndex
DROP INDEX `Lecturer_lecturer_id_key` ON `Lecturer`;

-- DropIndex
DROP INDEX `Plo_academic_id_fkey` ON `Plo`;

-- DropIndex
DROP INDEX `Plo_clo_clo_id_fkey` ON `Plo_clo`;

-- DropIndex
DROP INDEX `Plo_detail_plo_id_fkey` ON `Plo_detail`;

-- DropIndex
DROP INDEX `Result_exam_id_clo_id_fkey` ON `Result`;

-- DropIndex
DROP INDEX `Result_student_id_fkey` ON `Result`;

-- DropIndex
DROP INDEX `Role_role_id_key` ON `Role`;

-- DropIndex
DROP INDEX `Student_academic_id_fkey` ON `Student`;

-- DropIndex
DROP INDEX `Student_student_id_key` ON `Student`;

-- DropIndex
DROP INDEX `Subject_lecturer_id_fkey` ON `Subject`;

-- DropIndex
DROP INDEX `User_account_role_id_fkey` ON `User_account`;

-- AlterTable
ALTER TABLE `Academic` DROP PRIMARY KEY,
    DROP COLUMN `academic_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Academic_subject` DROP PRIMARY KEY,
    MODIFY `subject_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`academic_id`, `subject_id`);

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `admin_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Class` DROP PRIMARY KEY,
    DROP COLUMN `class_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `subject_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Clo` DROP PRIMARY KEY,
    DROP COLUMN `clo_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `subject_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Degree` DROP PRIMARY KEY,
    DROP COLUMN `degree_id`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Department` DROP PRIMARY KEY,
    DROP COLUMN `department_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Exam` DROP PRIMARY KEY,
    DROP COLUMN `date`,
    DROP COLUMN `exam_id`,
    ADD COLUMN `date_exam` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Lecturer` DROP PRIMARY KEY,
    DROP COLUMN `lecturer_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Plo` DROP PRIMARY KEY,
    DROP COLUMN `plo_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Plo_clo` DROP PRIMARY KEY,
    MODIFY `plo_id` VARCHAR(191) NOT NULL,
    MODIFY `clo_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`plo_id`, `clo_id`);

-- AlterTable
ALTER TABLE `Plo_detail` DROP PRIMARY KEY,
    DROP COLUMN `plo_detail_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `plo_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Result` DROP PRIMARY KEY,
    DROP COLUMN `clo_id`,
    DROP COLUMN `exam_id`,
    DROP COLUMN `result_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `question_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Role` DROP PRIMARY KEY,
    DROP COLUMN `role_id`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `student_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Subject` DROP PRIMARY KEY,
    DROP COLUMN `subject_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_account` DROP PRIMARY KEY,
    DROP COLUMN `user_account_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Exam_detail`;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `question_name` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(255) NOT NULL,
    `max_score` DOUBLE NOT NULL,
    `exam_id` VARCHAR(191) NOT NULL,
    `clo_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_id_key` ON `Admin`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_id_key` ON `Lecturer`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_id_key` ON `Role`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_id_key` ON `Student`(`id`);

-- AddForeignKey
ALTER TABLE `Academic` ADD CONSTRAINT `Academic_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo` ADD CONSTRAINT `Plo_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_detail` ADD CONSTRAINT `Plo_detail_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clo` ADD CONSTRAINT `Clo_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `Degree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
