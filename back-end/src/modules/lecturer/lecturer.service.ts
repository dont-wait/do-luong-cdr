import { Injectable } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class LecturerService {
    constructor(private readonly prisma: PrismaService) {}
    
}
