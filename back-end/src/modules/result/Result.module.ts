import { Module } from '@nestjs/common';
import { ResultService } from './Result.service';
import { ResultController } from './Result.controller';

@Module({
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
