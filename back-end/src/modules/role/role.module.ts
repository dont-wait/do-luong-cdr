import { Module } from '@nestjs/common';
import { RoleService } from './Role.service';
import { RoleController } from './Role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
