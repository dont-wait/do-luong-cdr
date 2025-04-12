import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';

@Injectable()
export class PloCloService {
  constructor(private readonly prisma: PrismaService) {}
  public async createPloClo(cloId: string, ploIds: string[]) {
    const validPlos = await this.prisma.plo.findMany({
      where: { id: { in: ploIds } },
      select: { id: true },
    });
  
    const validPloIds = validPlos.map(p => p.id);
  
    const invalidPloIds = ploIds.filter(id => !validPloIds.includes(id));
  
    if (invalidPloIds.length > 0) {
      throw new BadRequestException(`Invalid Plo IDs: ${invalidPloIds.join(', ')}`);
    }
  
    return await this.prisma.plo_clo.createMany({
      data: ploIds.map(ploId => ({
        clo_id: cloId,
        plo_id: ploId,
      })),
    });
  }
  async getAllPloClo() {  
    return this.prisma.plo_clo.findMany({
      include: {
        plo: true,
        clo: true,
      },
    });
  }
}
