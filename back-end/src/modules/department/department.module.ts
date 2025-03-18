import { Global, Module } from '@nestjs/common';
import { DepartmentController } from './Department.controller';
import { DepartmentService } from './Department.service';

@Global()
@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule {}
