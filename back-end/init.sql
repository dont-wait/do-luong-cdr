-- CreateTable
CREATE TABLE `Department` (
    `id` VARCHAR(191) NOT NULL,
    `department_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academic` (
    `id` VARCHAR(191) NOT NULL,
    `academic_name` VARCHAR(50) NOT NULL,
    `academic_level` INTEGER NOT NULL,
    `academic_type` INTEGER NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,

    INDEX `Academic_department_id_fkey`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Academic_subject` (
    `academic_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    INDEX `Academic_subject_subject_id_fkey`(`subject_id`),
    PRIMARY KEY (`academic_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo` (
    `id` VARCHAR(191) NOT NULL,
    `plo_name` CHAR(10) NOT NULL,
    `plo_content` VARCHAR(255) NOT NULL,
    `academic_id` VARCHAR(191) NOT NULL,

    INDEX `Plo_academic_id_fkey`(`academic_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo_clo` (
    `plo_id` VARCHAR(191) NOT NULL,
    `clo_id` VARCHAR(191) NOT NULL,

    INDEX `Plo_clo_clo_id_fkey`(`clo_id`),
    PRIMARY KEY (`plo_id`, `clo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plo_detail` (
    `id` VARCHAR(191) NOT NULL,
    `plo_detail_name` CHAR(10) NOT NULL,
    `plo_id` VARCHAR(191) NOT NULL,
    `plo_detail_content` VARCHAR(255) NOT NULL,

    INDEX `Plo_detail_plo_id_fkey`(`plo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` VARCHAR(191) NOT NULL,
    `subject_name` VARCHAR(255) NOT NULL,
    `practical_credits` INTEGER NOT NULL,
    `theoretical_credits` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `lecturer_subject_manager_id` VARCHAR(191) NOT NULL,

    INDEX `Subject_lecturer_subject_manager_id_fkey`(`lecturer_subject_manager_id`),
    UNIQUE INDEX `Subject_id_lecturer_subject_manager_id_key`(`id`, `lecturer_subject_manager_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturerSubject` (
    `lecturer_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    INDEX `LecturerSubject_subject_id_fkey`(`subject_id`),
    PRIMARY KEY (`lecturer_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clo` (
    `id` VARCHAR(191) NOT NULL,
    `clo_name` CHAR(10) NOT NULL,
    `clo_content` VARCHAR(255) NOT NULL,
    `clo_parent_id` VARCHAR(191) NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    INDEX `Clo_subject_id_fkey`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `id` VARCHAR(191) NOT NULL,
    `exam_name` VARCHAR(255) NOT NULL,
    `date_exam` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_id` VARCHAR(191) NOT NULL,

    INDEX `Exam_class_id_fkey`(`class_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `question_name` VARCHAR(255) NOT NULL,
    `exam_id` VARCHAR(191) NOT NULL,

    INDEX `Question_exam_id_fkey`(`exam_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `clo_id` VARCHAR(191) NOT NULL,
    `max_score` DOUBLE NULL,

    INDEX `Result_clo_id_fkey`(`clo_id`),
    INDEX `Result_question_id_fkey`(`question_id`),
    INDEX `Result_student_id_fkey`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,
    `lecturer_id` VARCHAR(191) NOT NULL,

    INDEX `Class_lecturer_id_fkey`(`lecturer_id`),
    INDEX `Class_subject_id_fkey`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassStudent` (
    `student_id` VARCHAR(191) NOT NULL,
    `class_id` VARCHAR(191) NOT NULL,

    INDEX `ClassStudent_class_id_fkey`(`class_id`),
    PRIMARY KEY (`student_id`, `class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL,
    `role_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Role_id_key`(`id`),
    UNIQUE INDEX `Role_role_name_key`(`role_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_account` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `admin_id` VARCHAR(191) NULL,
    `student_id` VARCHAR(191) NULL,
    `lecturer_id` VARCHAR(191) NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_account_admin_id_key`(`admin_id`),
    UNIQUE INDEX `User_account_student_id_key`(`student_id`),
    UNIQUE INDEX `User_account_lecturer_id_key`(`lecturer_id`),
    INDEX `User_account_role_id_fkey`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(15) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,
    `degree_id` INTEGER NOT NULL,
    `academic_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Lecturer_id_key`(`id`),
    UNIQUE INDEX `Lecturer_email_key`(`email`),
    UNIQUE INDEX `Lecturer_phone_key`(`phone`),
    INDEX `Lecturer_academic_id_fkey`(`academic_id`),
    INDEX `Lecturer_degree_id_fkey`(`degree_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Student_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(12) NOT NULL,

    UNIQUE INDEX `Admin_id_key`(`id`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    UNIQUE INDEX `Admin_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Degree` (
    `id` INTEGER NOT NULL,
    `degree_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Approve` (
    `id` VARCHAR(191) NOT NULL,
    `sender_id` VARCHAR(191) NOT NULL,
    `receiver_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `approve` BOOLEAN NOT NULL DEFAULT false,
    `approve_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Approve_receiver_id_fkey`(`receiver_id`),
    INDEX `Approve_sender_id_fkey`(`sender_id`),
    UNIQUE INDEX `Approve_subject_id_receiver_id_sender_id_key`(`subject_id`, `receiver_id`, `sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Academic` ADD CONSTRAINT `Academic_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Academic_subject` ADD CONSTRAINT `Academic_subject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo` ADD CONSTRAINT `Plo_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_clo` ADD CONSTRAINT `Plo_clo_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plo_detail` ADD CONSTRAINT `Plo_detail_plo_id_fkey` FOREIGN KEY (`plo_id`) REFERENCES `Plo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_lecturer_subject_manager_id_fkey` FOREIGN KEY (`lecturer_subject_manager_id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerSubject` ADD CONSTRAINT `LecturerSubject_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerSubject` ADD CONSTRAINT `LecturerSubject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clo` ADD CONSTRAINT `Clo_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_clo_id_fkey` FOREIGN KEY (`clo_id`) REFERENCES `Clo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassStudent` ADD CONSTRAINT `ClassStudent_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_lecturer_id_fkey` FOREIGN KEY (`lecturer_id`) REFERENCES `Lecturer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_account` ADD CONSTRAINT `User_account_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_academic_id_fkey` FOREIGN KEY (`academic_id`) REFERENCES `Academic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `Degree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approve` ADD CONSTRAINT `Approve_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

