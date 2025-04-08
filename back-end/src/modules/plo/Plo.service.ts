import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePloDto } from './dto/create-plo.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { AcademicService } from '../academic/Academic.service';

@Injectable()
export class PloService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly academic: AcademicService
  ){}

  async createPlo(data: CreatePloDto | CreatePloDto[]) {
    if (Array.isArray(data)) {
        for (const p of data) {
            if (!p.academic_id || !await this.academic.getAcademicById(p.academic_id)) {
                throw new BadRequestException("Academic ID không hợp lệ");
            }
        }
        return this.prisma.plo.createMany({data});
    }
    else{
      if (!data.academic_id || !await this.academic.getAcademicById(data.academic_id)) {
        throw new BadRequestException("Academic ID không hợp lệ");
    }
      return this.prisma.plo.create({data})
    }
  }



  async findManyPlos(){
    return this.prisma.plo.findMany();
  }

  async getPloById(id: string){
    return this.prisma.plo.findUnique({where: {id}})
  }

  async updatePlo(id: string, data: CreatePloDto){
    return this.prisma.plo.update({
      where: {id},
      data
    })
  }

  async removePlo(id: string){
    return this.prisma.plo.delete({where: {id}})
  }
}
