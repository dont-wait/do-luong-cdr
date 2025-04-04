import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserAccountService } from './UseAccount.service';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @ApiOperation({ summary: 'Get all user accounts' })
  @ApiResponse({ status: 200, description: 'Return all user accounts.' })
  @Get()
  getAllUserAccout() {
    return this.userAccountService.getAllUserAccout();
  }



  @ApiOperation({ summary: 'Delete user account' })
  @ApiParam({ name: 'id', description: 'User account ID' })
  @ApiResponse({ status: 200, description: 'User account has been deleted.' })
  @ApiResponse({ status: 404, description: 'User account not found.' })
  @Delete(':id')
  deleteUserAccount(@Param('id') id: string) {
    return this.userAccountService.deleteUserAccount(+id);
  }
}
