import { Module } from '@nestjs/common';
import { PloCloService } from './PloClo.service';
import { PloCloController } from './PloClo.controller';

@Module({
  controllers: [PloCloController],
  providers: [PloCloService],
})
export class PloCloModule {}
