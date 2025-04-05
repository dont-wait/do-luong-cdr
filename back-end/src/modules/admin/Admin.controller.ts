import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdminService } from './Admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  getAllAdmin() {
    return this.adminService.getAllAdmin();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }
  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ type: CreateAdminDto })
  async updateAdmin(@Param('id') id: string, @Body() data: CreateAdminDto) {
    return this.adminService.updateAdmin(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
