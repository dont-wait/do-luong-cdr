import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCloDto } from './dto/create-clo.dto';
import { PrismaService } from '../prisma/Prisma.service';
import { PloCloService } from '../ploClo/PloClo.service';
import { SubjectService } from '../subject/Subject.service';

@Injectable()
export class CloService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ploclo: PloCloService,
    private readonly subjectService: SubjectService,
  ) {}
    public async createClo(createCloDto: CreateCloDto | CreateCloDto[]) {
      try {
        if (!Array.isArray(createCloDto)) {
          const { clo_name, clo_content, clo_parent_id, subject_id, ploIds } = createCloDto;

          const subject = await this.subjectService.getSubjectById(subject_id);
          
          if (!subject) {
            throw new BadRequestException('Subject not found');
          }

          if (clo_parent_id) {
            const parentClo = await this.prisma.clo.findUnique({
              where: { id: clo_parent_id },
            });
            if (!parentClo) {
              throw new BadRequestException('Parent CLO not found');
            }
          }

          if (ploIds && ploIds.length > 0) {
            const validPlos = await this.prisma.plo.findMany({
              where: { id: { in: ploIds } },
              select: { id: true },
            });
            if (validPlos.length !== ploIds.length) {
              throw new BadRequestException('Some Plo IDs are invalid');
            }
          }

          const newClo = await this.prisma.clo.create({
            data: {
              clo_name,
              clo_content,
              clo_parent_id,
              subject_id,
            },
          });

          if (ploIds && ploIds.length > 0) {
            await this.ploclo.createPloClo(newClo.id, ploIds);
          }

          return {
            id: newClo.id,
            clo_name,
            clo_content,
            clo_parent_id,
            subject_id,
            ploIds: ploIds || [],
          };
        } 
        else {
          const results: { id: string; clo_name: string; clo_content: string; clo_parent_id: string | undefined; subject_id: string; ploIds: string[] }[] = [];
          for (const dto of createCloDto) {
            const { clo_name, clo_content, clo_parent_id, subject_id, ploIds } = dto;

            const subject = await this.prisma.subject.findUnique({
              where: { id: subject_id },
            });
            if (!subject) {
              throw new BadRequestException(`Subject not found for ${clo_name}`);
            }

            if (clo_parent_id) {
              const parentClo = await this.prisma.clo.findUnique({
                where: { id: clo_parent_id },
              });
              if (!parentClo) {
                throw new BadRequestException(`Parent CLO not found for ${clo_name}`);
              }
            }

            if (ploIds && ploIds.length > 0) {
              const validPlos = await this.prisma.plo.findMany({
                where: { id: { in: ploIds } },
                select: { id: true },
              });
              if (validPlos.length !== ploIds.length) {
                throw new BadRequestException(`Some Plo IDs are invalid for ${clo_name}`);
              }
            }

            const newClo = await this.prisma.clo.create({
              data: {
                clo_name,
                clo_content,
                clo_parent_id,
                subject_id,
              },
            });

            if (ploIds && ploIds.length > 0) {
              await this.ploclo.createPloClo(newClo.id, ploIds);
            }

            results.push({
              id: newClo.id,
              clo_name,
              clo_content,
              clo_parent_id,
              subject_id,
              ploIds: ploIds || [],
            });
          }
          return results;
        }
      } catch (error) {
        throw new BadRequestException('Failed to create Clo: ' + error.message);
      }
    }
  
  async findManyClos() {
    return this.prisma.clo.findMany().then((clos) => { 
      if (clos.length === 0) {
        throw new BadRequestException('No CLO found');
      }
      return clos;
    });
  }

  async getCloById(id: string) {
    return this.prisma.clo.findUnique({where: {id}})
  }

  async updateClo(id: string, data: CreateCloDto) {
    return this.prisma.clo.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.clo.delete({where: {id}})
  }
}
