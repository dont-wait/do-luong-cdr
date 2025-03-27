import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateApproveDto } from './dto/createApprove';
import { LecturerService } from '../lecturer/Lecturer.service';

@Injectable()
export class ApproveService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly lecturer: LecturerService
    ) {}

    public async sendApprove(data: CreateApproveDto) {
        const { sender_id, receiver_id, approveData } = data;

        const [sender, receiver] = await Promise.all([
            this.lecturer.getLecturerById(sender_id),
            this.lecturer.getLecturerById(receiver_id)
        ]);

        const isSender_RecipientExist = !!(sender && receiver);

        if (!isSender_RecipientExist) 
            throw new BadRequestException(`Không tìm thấy sender_id ${sender_id} hoặc receiver_id ${receiver_id}`);
        
        return await this.prisma.approve.create({
            data: {
                sender_id,
                receiver_id,
                data: typeof approveData === "string" ? approveData : JSON.stringify(approveData)
            }
        });
    }

    public async getApproveByReceiverId(id: string) {
        return await this.prisma.approve.findMany({
            where: { receiver_id: id }
        });
    }
}