import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { ClassStudentService } from '../classStudent/ClassStudent.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly classstudent: ClassStudentService,
  ) {}

  public getAllStudents() {
    return this.prisma.student.findMany();
  }

  public getStudent(id: string) {
    const student = this.prisma.student.findFirst({
      where: {
        id,
      },
    });

    if (!student) throw new NotFoundException('Không tìm thấy Student ID này');

    return student;
  }
  
  public async createStudent(createStudentDto: CreateStudentDto) {
    const { class_id, ...Data } = createStudentDto;
  
    const classExists = await this.prisma.class.findUnique({
      where: { id: class_id },
    });
  
    if (!classExists) {
      throw new BadRequestException(`Class ID ${class_id} not found`);
    }
  

    const newStudent = await this.prisma.student.create({ data: Data });
  
    await this.classstudent.createAClassStudent(class_id, newStudent.id);
  
    return newStudent;
  }
  
}
