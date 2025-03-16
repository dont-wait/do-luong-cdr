import { Module } from '@nestjs/common';
import { LecturerService } from './Lecturer.service';
import { LecturerController } from './Lecturer.controller';
import { PrismaModule } from '../prisma/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LecturerController],
  providers: [LecturerService],
})
export class LecturerModule {}
