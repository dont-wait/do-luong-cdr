/*
  Warnings:

  - You are about to drop the column `lecturer_id` on the `Subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subject_id,receiver_id,sender_id]` on the table `Approve` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,lecturer_subject_manager_id]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subject_id` to the `Approve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Subject` DROP FOREIGN KEY `Subject_lecturer_id_fkey`;

-- DropIndex
DROP INDEX `Subject_lecturer_id_fkey` ON `Subject`;

-- AlterTable
ALTER TABLE `Approve` ADD COLUMN `subject_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Subject` DROP COLUMN `lecturer_id`;

-- CreateTable
CREATE TABLE `LecturerSubject` (
    `lecturer_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`lecturer_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Approve_subject_id_receiver_id_sender_id_key` ON `Approve`(`subject_id`, `receiver_id`, `sender_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Subject_id_lecturer_subject_manager_id_key` ON `Subject`(`id`, `lecturer_subject_manager_id`);

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_lecturer_subject_manager_id_fkey` FOREIGN KEY (`lecturer_subject_manager_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerSubject` ADD CONSTRAINT `LecturerSubject_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerSubject` ADD CONSTRAINT `LecturerSubject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
