-- CreateTable
CREATE TABLE `Department` (
    `department_id` CHAR(10) NOT NULL,
    `department_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academic` (
    `academic_id` CHAR(10) NOT NULL,
    `academic_name` VARCHAR(50) NOT NULL,
    `academic_level` INTEGER NOT NULL,
    `academic_type` INTEGER NOT NULL,
    `department_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`academic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo` (
    `plo_id` CHAR(10) NOT NULL,
    `plo_name` VARCHAR(255) NOT NULL,
    `academic_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`plo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `subject_id` CHAR(10) NOT NULL,
    `subject_name` VARCHAR(255) NOT NULL,
    `practical_credits` INTEGER NOT NULL,
    `theoretical_credits` INTEGER NOT NULL,
    `academic_id` CHAR(10) NOT NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Target` (
    `target_id` CHAR(10) NOT NULL,
    `target_name` VARCHAR(255) NOT NULL,
    `subject_id` CHAR(10) NOT NULL,
    `academic_id` CHAR(10) NOT NULL,

    PRIMARY KEY (`target_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChitietTarget` (
    `plo_id` VARCHAR(191) NOT NULL,
    `target_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`plo_id`, `target_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Academic` ADD CONSTRAINT `Academic_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo` ADD CONSTRAINT `Plo_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Target` ADD CONSTRAINT `Target_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Target` ADD CONSTRAINT `Target_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChitietTarget` ADD CONSTRAINT `ChitietTarget_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChitietTarget` ADD CONSTRAINT `ChitietTarget_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `Target`(`target_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
