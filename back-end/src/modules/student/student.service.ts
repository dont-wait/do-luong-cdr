import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

}
