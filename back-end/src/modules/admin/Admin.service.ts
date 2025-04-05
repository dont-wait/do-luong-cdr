import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { UserAccountService } from '../userAccount/UserAccount.service';
import { roles } from "../../configs/config.json";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userAccount: UserAccountService
  ) {}

  public async createAdmin(data: CreateAdminDto) {
    const { id, password, ...rest } = data;

    const adminRole = roles.find(r => r.role_name === "admin");

    if (!adminRole?.role_id) 
      throw new BadRequestException("Không tìm thấy role admin");
    
   try {
      const createUserAccountDto = {
        admin_id: id,
        password,
        role_id: adminRole.role_id,
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

  public async updateAdmin(admin_id: string, data: CreateAdminDto) {
    const { password, id, ...updateData } = data;
    const adminRole = roles.find(r => r.role_name === "admin");
    
    if (!adminRole?.role_id) {
        throw new BadRequestException("Không tìm thấy role admin");
    }

    const userAccountData = {
        ...updateData,
        admin_id: id,
        lecturer_id: null,
        role_id: adminRole.role_id,
    };
    
    try {
          await this.userAccount.updateUserAccount(userAccountData, password);
            
            return await this.prisma.admin.update({
                where: { id: admin_id },
                data: updateData,
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }


}

  public async deleteAdmin(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    try {
      return await this.prisma.admin.delete({
        where: { id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
