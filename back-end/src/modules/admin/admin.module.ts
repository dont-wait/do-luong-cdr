import { Module } from '@nestjs/common';
import { AdminService } from './Admin.service';
import { AdminController } from './Admin.controller';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
