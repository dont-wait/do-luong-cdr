import { Module } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { DegreeController } from './degree.controller';

@Module({
  controllers: [DegreeController],
  providers: [DegreeService],
})
export class DegreeModule {}
