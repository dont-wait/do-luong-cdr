import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdminService } from './Admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

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

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ type: UpdateAdminDto })
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
