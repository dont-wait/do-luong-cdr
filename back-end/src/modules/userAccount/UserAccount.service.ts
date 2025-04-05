import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/Prisma.service';
import { roles } from "../../configs/config.json";

@Injectable()
export class UserAccountService {
  private readonly roleName = roles.map(role => role.role_name);
  
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async createUserAccount(createUserAccountDto: CreateUserAccountDto, password: string) {
    const { admin_id, lecturer_id, role_id } = createUserAccountDto; 

    if (!admin_id && !lecturer_id) {
      throw new BadRequestException("Thiếu 1 trong 3 ID của admin, lecturer");
    }

    const role = await this.prisma.role.findUnique({
      where: { id: role_id }
    });

    if (!role) {
      throw new BadRequestException(`Không tìm thấy role ID: ${role_id}`);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUserAccount = await this.prisma.user_account.create({
        data: {
          password: hashedPassword,
          admin_id,
          lecturer_id,
          role_id
        }
      });
      
      return newUserAccount;
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  getAllUserAccout() {
    
  }

  protected async getUserAccountById(id: string, password: string) {
    const user = await this.prisma.user_account.findFirst({
      where: { 
        OR: [
          { admin_id: id },
          { lecturer_id: id },
        ] 
      },
      include: { 
        admin: true,
        lecturer: true,
        role: true,
      }
    });

    if (!user) 
      throw new BadRequestException(`Không tìm thấy user ID: ${id}`);
    

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) 
      throw new BadRequestException("Sai mật khẩu");

    return user;
  }


  updateUserAccount(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  deleteUserAccount(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
