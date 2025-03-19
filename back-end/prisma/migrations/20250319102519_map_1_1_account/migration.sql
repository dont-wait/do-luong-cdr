/*
  Warnings:

  - A unique constraint covering the columns `[admin_id]` on the table `User_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id]` on the table `User_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lecturer_id]` on the table `User_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User_account` ADD COLUMN `admin_id` VARCHAR(191) NULL,
    ADD COLUMN `lecturer_id` VARCHAR(191) NULL,
    ADD COLUMN `student_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_account_admin_id_key` ON `User_account`(`admin_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_account_student_id_key` ON `User_account`(`student_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_account_lecturer_id_key` ON `User_account`(`lecturer_id`);

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`lecturer_id`) ON DELETE SET NULL ON UPDATE CASCADE;
