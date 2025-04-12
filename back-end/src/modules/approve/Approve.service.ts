import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateApproveDto } from './dto/createApprove';
import { UpdateApproveDto } from './dto/updateApprove';

@Injectable()
export class ApproveService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    public async sendApprove(data: CreateApproveDto) {
        try {
            return await this.prisma.approve.create({
                data: {
                    sender_id: data.sender_id,
                    receiver_id: data.receiver_id,
                    subject_id: data.subject_id,
                    data: typeof data.approveData === "string" ? data.approveData : JSON.stringify(data.approveData)
                }
            });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException("Không thể gửi approve");
        }
    }

    public async getApproveByReceiverId(id: string) {
        return await this.prisma.approve.findMany({
            where: { 
                receiver_id: id 
            }
        })
        .then((data) => { 
            if (data.length === 0) {
                throw new NotFoundException(`Không tìm thấy approve cho receiver ID: ${id}`);
            }
            return data;
        });
    }

    public async updateApprove(data: UpdateApproveDto) {
        const { sender_id, receiver_id, approve } = data;

        const existingApprove = await this.prisma.approve.findFirst({
            where: { sender_id, receiver_id },
        });

        if (!existingApprove) {
            throw new NotFoundException(`Không tìm thấy approve giữa sender ${sender_id} và receiver ${receiver_id}`);
        }

        return await this.prisma.approve.update({
            where: { id: existingApprove.id },
            data: { approve }
        }).then(async () => {

            await this.prisma.approve.delete({
                where: { id: existingApprove.id }
            });
            
        }).catch((error) => {
            if (error instanceof NotFoundException || error instanceof BadRequestException) 
                throw error;
        })
    }
}