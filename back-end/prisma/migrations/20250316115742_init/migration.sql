-- CreateTable
CREATE TABLE `Department` (
    `department_id` VARCHAR(191) NOT NULL,
    `department_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academic` (
    `academic_id` VARCHAR(191) NOT NULL,
    `academic_name` VARCHAR(50) NOT NULL,
    `academic_level` INTEGER NOT NULL,
    `academic_type` INTEGER NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`academic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academic_subject` (
    `academic_id` VARCHAR(191) NOT NULL,
    `subject_id` INTEGER NOT NULL,

    PRIMARY KEY (`academic_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer` (
    `lecturer_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(15) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,
    `degree_id` INTEGER NOT NULL,
    `academic_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Lecturer_email_key`(`email`),
    UNIQUE INDEX `Lecturer_phone_key`(`phone`),
    PRIMARY KEY (`lecturer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo` (
    `plo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plo_name` CHAR(10) NOT NULL,
    `plo_content` VARCHAR(255) NOT NULL,
    `academic_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`plo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo_clo` (
    `plo_id` INTEGER NOT NULL,
    `clo_id` INTEGER NOT NULL,

    PRIMARY KEY (`plo_id`, `clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo_detail` (
    `plo_detail_id` VARCHAR(191) NOT NULL,
    `plo_detail_name` CHAR(10) NOT NULL,
    `plo_content` VARCHAR(255) NOT NULL,
    `plo_id` INTEGER NOT NULL,

    PRIMARY KEY (`plo_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `subject_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_name` VARCHAR(255) NOT NULL,
    `practical_credits` INTEGER NOT NULL,
    `theoretical_credits` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `lecturer_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clo` (
    `clo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `clo_name` CHAR(10) NOT NULL,
    `clo_content` VARCHAR(255) NOT NULL,
    `clo_parent_id` INTEGER NULL,
    `subject_id` INTEGER NOT NULL,

    PRIMARY KEY (`clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam_detail` (
    `clo_id` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,

    PRIMARY KEY (`exam_id`, `clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `exam_id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_name` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `class_id` VARCHAR(191) NOT NULL,
    `subject_id` INTEGER NOT NULL,
    `lecturer_id` VARCHAR(191) NOT NULL,

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
    `user_account_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `student_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,
    `academic_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_phone_key`(`phone`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `score` DOUBLE NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `clo_id` INTEGER NOT NULL,

    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Degree` (
    `degree_id` INTEGER NOT NULL,
    `degree_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`degree_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Academic` ADD CONSTRAINT `Academic_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `Degree`(`degree_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo` ADD CONSTRAINT `Plo_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`academic_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_detail` ADD CONSTRAINT `Plo_detail_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`plo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`lecturer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clo` ADD CONSTRAINT `Clo_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Result` ADD CONSTRAINT `Result_exam_id_clo_id_fkey` FOREIGN KEY (`exam_id`, `clo_id`) REFERENCES `Exam_detail`(`exam_id`, `clo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
