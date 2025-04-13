import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '../prisma/Prisma.service';


@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public getAllStudents() {
    return this.prisma.student.findMany();
  }

  public async getStudent(id: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        id,
      },
    });

    if (!student) throw new NotFoundException('Không tìm thấy Student ID này');

    return student;
  }
  
  public async createStudent(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.prisma.student.findFirst({
      where: {
        id: createStudentDto.id,
      },
    });

    if (existingStudent) {
      throw new BadRequestException('Student ID đã tồn tại');
    }

    return this.prisma.student.create({
      data: createStudentDto,
    });
  }
  
}
