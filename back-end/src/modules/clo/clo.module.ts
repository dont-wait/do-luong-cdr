import { Module } from '@nestjs/common';
import { CloService } from './clo.service';
import { CloController } from './clo.controller';

@Module({
  controllers: [CloController],
  providers: [CloService],
})
export class CloModule {}
