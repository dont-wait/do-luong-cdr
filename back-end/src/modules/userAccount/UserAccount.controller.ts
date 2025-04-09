import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserAccountService } from './UserAccount.service';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('accounts')
@Controller('accounts')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Get()
  @Roles(2001)
  @ApiOperation({ summary: 'Get all user accounts' })
  @ApiResponse({ status: 200, description: 'Return all user accounts.' })
  getAllUserAccout() {
    return this.userAccountService.getAllUserAccout();
  }

  @Delete(':id')
  @Roles(2001)
  @ApiOperation({ summary: 'Delete user account' })
  @ApiParam({ name: 'id', description: 'User account ID' })
  @ApiResponse({ status: 200, description: 'User account has been deleted.' })
  @ApiResponse({ status: 404, description: 'User account not found.' })
  deleteUserAccount(@Param('id') id: string) {
    return this.userAccountService.deleteUserAccount(+id);
  }
}
