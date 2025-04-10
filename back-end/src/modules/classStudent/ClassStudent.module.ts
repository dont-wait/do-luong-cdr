import { Module } from "@nestjs/common";
import { ClassStudentController } from "./ClassStudent.controller";
import { ClassStudentService } from "./ClassStudent.service";
import { ClassModule } from "../class/Class.module";
import { StudentModule } from "../student/Student.module";
import { PrismaModule } from "../prisma/Prisma.module";

@Module({
    imports:[ClassModule, StudentModule, PrismaModule],
    controllers: [ClassStudentController], 
    providers: [ClassStudentService],
    exports: [ClassStudentService],
})
export class ClassStudentModule {}