import { Controller } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { ApproveService } from './Approve.service';

@Controller()
export class ApproveController {
    constructor(
        private readonly approveService: ApproveService
    ) {}

    
}