import { Module } from '@nestjs/common';
import { ClassService } from './Class.service';
import { ClassController } from './Class.controller';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
