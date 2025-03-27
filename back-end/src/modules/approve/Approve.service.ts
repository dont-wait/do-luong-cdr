import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class ApproveService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    
}