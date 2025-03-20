/*
  Warnings:

  - A unique constraint covering the columns `[admin_id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lecturer_id]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Admin_admin_id_key` ON `Admin`(`admin_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_lecturer_id_key` ON `Lecturer`(`lecturer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_role_id_key` ON `Role`(`role_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_role_name_key` ON `Role`(`role_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_student_id_key` ON `Student`(`student_id`);
