import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAccountService } from './UseAccount.service';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';

@Controller('accounts')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Get()
  getAllUserAccout() {
    return this.userAccountService.getAllUserAccout();
  }

  @Get(':id')
  getUserAccountById(@Param('id') id: string) {
    return this.userAccountService.getUserAccountById(+id);
  }

  @Patch(':id')
  updateUserAccount(@Param('id') id: string, @Body() updateUserAccountDto: UpdateUserAccountDto) {
    return this.userAccountService.updateUserAccount(+id, updateUserAccountDto);
  }

  @Delete(':id')
  deleteUserAccount(@Param('id') id: string) {
    return this.userAccountService.deleteUserAccount(+id);
  }
}
