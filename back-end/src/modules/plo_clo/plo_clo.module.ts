import { Module } from '@nestjs/common';
import { PloCloService } from './plo_clo.service';
import { PloCloController } from './plo_clo.controller';

@Module({
  controllers: [PloCloController],
  providers: [PloCloService],
})
export class PloCloModule {}
