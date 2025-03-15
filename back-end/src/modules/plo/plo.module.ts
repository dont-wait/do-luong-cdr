import { Module } from '@nestjs/common';
import { PloService } from './plo.service';
import { PloController } from './plo.controller';

@Module({
  controllers: [PloController],
  providers: [PloService],
})
export class PloModule {}
