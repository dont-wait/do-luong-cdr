import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePloDetailDto } from './dto/create-plo_detail.dto';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class PloDetailService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async createPloDetail(Data: CreatePloDetailDto | CreatePloDetailDto[]){
    if(Array.isArray(Data)){
      for(const p of Data){
        const ploExist = await this.prisma.plo.findUnique({where: {id: p.plo_id}});
        if(!ploExist){
          throw new BadRequestException(`Plo ID ${p.plo_id} not found`);
        }
        return this.prisma.plo_detail.createMany({data: Data});
      }
    }
    else{
      const ploExist = await this.prisma.plo.findUnique({where: {id: Data.plo_id}});
      if(!ploExist){
        throw new BadRequestException(`Plo ID ${Data.plo_id} not found`);
      }
      return this.prisma.plo_detail.create({data: Data});
    }
  }
  async getPloDetailByID(id: string){
    const PloDetail = await this.prisma.plo_detail.findUnique({where: {id}});
    if(!PloDetail){
      throw new BadRequestException(`Plo_Detail ID ${id}} not found`);
    }
    return PloDetail;
  }
  async getAllPloDetail(){
    return this.prisma.plo_detail.findMany();
  }

  async updatePloDeTail(id: string, newData: CreatePloDetailDto){
    const PloDetail = await this.prisma.plo_detail.findUnique({where: {id}});
    if(!PloDetail){
      throw new BadRequestException(`Plo_Detail ID ${id}} not found`);
    }
    return this.prisma.plo_detail.update({where: {id}, data: newData});
  }
}
