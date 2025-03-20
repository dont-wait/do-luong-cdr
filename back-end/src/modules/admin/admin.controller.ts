import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './Admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(+id);
  }
}
