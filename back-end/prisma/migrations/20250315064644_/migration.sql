-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_clo_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_exam_id_fkey`;

-- DropIndex
DROP INDEX `Result_clo_id_fkey` ON `result`;

-- DropIndex
DROP INDEX `Result_exam_id_fkey` ON `result`;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_exam_id_clo_id_fkey` FOREIGN KEY (`exam_id`, `clo_id`) REFERENCES `Exam_detail`(`exam_id`, `clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
