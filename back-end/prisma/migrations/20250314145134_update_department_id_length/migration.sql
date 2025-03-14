-- DropForeignKey
ALTER TABLE `academic` DROP FOREIGN KEY `Academic_department_id_fkey`;

-- DropIndex
DROP INDEX `Academic_department_id_fkey` ON `academic`;

-- AlterTable
ALTER TABLE `academic` MODIFY `department_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Academic` ADD CONSTRAINT `Academic_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
