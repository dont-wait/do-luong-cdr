import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { Certificate } from 'crypto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  
}
