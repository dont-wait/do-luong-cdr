import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async createUserAccount(createUserAccountDto: CreateUserAccountDto, password: string) {
    const { admin_id, lecturer_id, student_id, role_id } = createUserAccountDto; 

    if (!admin_id && !lecturer_id && !student_id) {
      throw new BadRequestException("Thiếu 1 trong 3 ID của admin, lecturer, student");
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
          student_id,
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

  public async getUserAccountById(id: string) {
    const user = await this.prisma.user_account.findFirst({
      where: { 
        OR: [
          { admin_id: id },
          { lecturer_id: id },
          { student_id: id }
        ] 
      },
      include: { 
        admin: true,
        lecturer: true,
        student: true, 
        role: true,
      }
    });

    if (!user) {
      throw new BadRequestException(`Không tìm thấy user ID: ${id}`);
    }

    let userData;
    
  }


  updateUserAccount(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  deleteUserAccount(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
