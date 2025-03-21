import { Module } from '@nestjs/common';
import { PloService } from './Plo.service';
import { PloController } from './Plo.controller';

@Module({
  controllers: [PloController],
  providers: [PloService],
})
export class PloModule {}
