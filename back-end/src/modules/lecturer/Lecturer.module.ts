import { Global, Module } from '@nestjs/common';
import { LecturerService } from './Lecturer.service';
import { LecturerController } from './Lecturer.controller';

@Global()
@Module({
  controllers: [LecturerController],
  providers: [LecturerService],
  exports: [LecturerService],
})
export class LecturerModule {}
