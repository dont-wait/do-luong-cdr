import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/Prisma.service";
import { CreateClassStudentDto } from "./dto/createClassStudent.dto";
import { ClassService } from "../class/Class.service";
import { StudentService } from "../student/Student.service";

@Injectable()
export class ClassStudentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly classService: ClassService,
        private readonly studentService: StudentService
    ){}
    
    async createClassStudent(data: CreateClassStudentDto | CreateClassStudentDto[]) {
        const dataArray = Array.isArray(data) ? data : [data];
      
        if (!dataArray.length) {
          throw new BadRequestException('No data provided');
        }
      
        // Kiểm tra tính hợp lệ của tất cả các item trước khi tạo
        for (const item of dataArray) {
          const classExists = await this.classService.getClassById(String(item.classId));
          if (!classExists) {
            throw new BadRequestException(`Class with ID ${item.classId} not found`);
          }
      
          const studentExists = await this.studentService.getStudentById(String(item.studentId));
          if (!studentExists) {
            throw new BadRequestException(`Student with ID ${item.studentId} not found`);
          }
      
          const existingRecord = await this.prisma.classStudent.findFirst({
            where: {
              class_id: item.classId.toString(),
              student_id: item.studentId.toString(),
            },
          });
          if (existingRecord) {
            throw new BadRequestException(
              `Student ${item.studentId} is already enrolled in class ${item.classId}`,
            );
          }
        }
      
        // Sau khi kiểm tra xong, tạo tất cả bản ghi cùng lúc
        try {
          const result = await this.prisma.classStudent.createMany({
            data: dataArray.map((item) => ({
              class_id: item.classId.toString(),
              student_id: item.studentId.toString(),
            })),
            skipDuplicates: true, 
          });
          return { message: 'Class-student records created successfully', data: result };
        } catch (error) {
          throw new BadRequestException('Failed to create class-student records: ' + error.message);
        }
      }

    async getAllClassStudent() {
        try{
            const records =  this.prisma.classStudent.findMany({
                include: {
                    student: true,
                    class: true,
                },
            });
            if(!(await records).length)
                return {message: "No class-student found!", data: []}
            return records;
        }catch(err) {
            throw new BadRequestException("Failed to fetch class-student records: " + err.message)
        }
        
    }


    async getInfoClassByStudentId(student_id: string) {
        if (!student_id) {
          throw new BadRequestException('Student id not found');
        }
      
        try {
          // Tìm kiếm các bản ghi trong bảng classStudent với student_id
          const records = await this.prisma.classStudent.findMany({
            where: {
              student_id: student_id,
            },
            include: {
              student: true,  
              class: true,   
            },
          });
      
          if (!records.length) {
            throw new BadRequestException(
              `No records found for student ID ${student_id}`,
            );
          }
          return records;
          
        } catch (error) {
          // Nếu có lỗi xảy ra trong quá trình truy vấn
          throw new BadRequestException(
            'Failed to fetch classes by student ID: ' + error.message,
          );
        }
      }

    async getInfoStudentsByClassId(class_id: string) {
        if(!class_id)
            throw new BadRequestException("Class id not found");
        try {
            const records = await this.prisma.classStudent.findMany({
                where: { class_id: class_id },
                include: {
                    student: true, 
                    class: true,   
                },
            });

            if (!records.length) {
                throw new BadRequestException(`No students found for class ID ${class_id}`);
            }

            return records;
        } catch (error) {
            throw new BadRequestException("Failed to fetch students by class ID: " + error.message);
        }
    }
}