import { Global, Module } from '@nestjs/common';
import { ApproveController } from './Approve.controller';
import { ApproveService } from './Approve.service';

@Module({
  controllers: [ApproveController],
  providers: [ApproveService],
  exports: [ApproveService],
})
export class ApproveModule {}
