import { Module } from '@nestjs/common';
import { LecturerService } from './Lecturer.service';
import { LecturerController } from './Lecturer.controller';

@Module({
  controllers: [LecturerController],
  providers: [LecturerService],
  exports: [LecturerService]
})
export class LecturerModule {}
