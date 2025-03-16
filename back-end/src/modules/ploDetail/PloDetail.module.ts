import { Module } from '@nestjs/common';
import { PloDetailService } from './PloDetail.service';
import { PloDetailController } from './PloDetail.controller';

@Module({
  controllers: [PloDetailController],
  providers: [PloDetailService],
})
export class PloDetailModule {}
