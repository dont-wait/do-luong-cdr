import { Module } from '@nestjs/common';
import { DegreeService } from './Degree.service';
import { DegreeController } from './Degree.controller';

@Module({
  controllers: [DegreeController],
  providers: [DegreeService],
})
export class DegreeModule {}
