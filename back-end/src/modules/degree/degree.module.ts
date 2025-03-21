import { Global, Module } from '@nestjs/common';
import { DegreeService } from './Degree.service';
import { DegreeController } from './Degree.controller';

@Global()
@Module({
  controllers: [DegreeController],
  providers: [DegreeService],
  exports: [DegreeService]
})
export class DegreeModule {}
