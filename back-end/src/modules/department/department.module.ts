import { Module } from '@nestjs/common';
import { DepartmentController } from './Department.controller';
import { DepartmentService } from './Department.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
