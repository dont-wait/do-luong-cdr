import { Module } from '@nestjs/common';
import { SubjectService } from './Subject.service';
import { SubjectController } from './Subject.controller';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
