import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/Prisma.service';
import { roles } from "../../configs/config.json";
import { CLIENT_RENEG_LIMIT } from 'tls';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class UserAccountService {
  private readonly roleName = roles.map(role => role.role_name);
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async createUserAccount(createUserAccountDto: CreateUserAccountDto, password: string) {
    const { admin_id, lecturer_id, role_id } = createUserAccountDto; 

    if (!admin_id && !lecturer_id) {
        throw new BadRequestException("Thiếu 1 trong 2 ID của admin hoặc lecturer");
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
    } catch (err) {
        throw new InternalServerErrorException('Error creating user account: ' + err.message);
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
      throw new UnauthorizedException(`Sai mật khẩu hoặc id user`);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Sai mật khẩu hoặc id user");

    }

    // cái này là để xóa password ra khỏi payload
    const { password: _, ...payload } = user;

    const token = this.jwtService.sign(payload);

    return { user, access_token: token };
  }


  public async updateUserAccount(updateUserAccountDto: UpdateUserAccountDto, password:string) {
    const {admin_id, lecturer_id, role_id} = updateUserAccountDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!lecturer_id && !admin_id)
      throw new BadRequestException("Không ti`m tha^'y tài khoản admin hoặc lecturer nào");
    
    return await this.prisma.user_account.updateMany({
      where: {
      OR: [
        { admin_id: admin_id || undefined },
        { lecturer_id: lecturer_id || undefined }
      ]
      },
      data: {
        password: hashedPassword,
        admin_id: admin_id,
        lecturer_id: lecturer_id,
        role_id
      }
    });
}

  deleteUserAccount(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
