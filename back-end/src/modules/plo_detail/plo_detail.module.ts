import { Module } from '@nestjs/common';
import { PloDetailService } from './plo_detail.service';
import { PloDetailController } from './plo_detail.controller';

@Module({
  controllers: [PloDetailController],
  providers: [PloDetailService],
})
export class PloDetailModule {}
