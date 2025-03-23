import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { UserAccountService } from '../userAccount/UseAccount.service';
import { roles } from "../../configs/config.json";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userAccount: UserAccountService
  ) {}

  public async createAdmin(data: CreateAdminDto) {
    const { id, password, ...rest } = data;

    const adminRole = roles.find(r => r.role_name === "student");

    if (!adminRole?.role_id) 
      throw new BadRequestException("Không tìm thấy role admin");
    
    try {
      const createUserAccountDto = {
        admin_id: id,
        password,
        role_id: adminRole.role_id,
        student_id: null, 
        lecturer_id: null 
      };
      
      await this.prisma.admin.create({
        data: {
          id,
          ...rest
        }
      });
  
      await this.userAccount.createUserAccount(createUserAccountDto, password);

      return {
        id,
        ...rest
      }
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  public async getAllAdmin() {
    return await this.prisma.admin.findMany();
  }

  public async getAdminById(id: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        id: id
      }
    })

    if (!admin)
      throw new NotFoundException("Không tìm thấy Admin ID này");

    return admin;
  }
}
