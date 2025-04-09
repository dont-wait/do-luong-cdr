import { Module } from '@nestjs/common';
import { CloService } from './Clo.service';
import { CloController } from './Clo.controller';
import { PloCloService } from '../ploClo/PloClo.service';

@Module({
  controllers: [CloController],
  providers: [CloService, PloCloService],
  exports: [CloService],
})
export class CloModule {}
