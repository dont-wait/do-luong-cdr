import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "../../modules/prisma/Prisma.service";
import { CreateApproveDto } from "src/modules/approve/dto/createApprove";

@Injectable()
export class ApproveValidatePipe implements PipeTransform {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async transform(value: CreateApproveDto, metadata: ArgumentMetadata) {
        const { sender_id, receiver_id, subject_id, approveData } = value;

        const [sender, receiver, subject] = await Promise.all([
            this.prisma.lecturer.findUnique({ where: { id: sender_id } }),
            this.prisma.lecturer.findUnique({ where: { id: receiver_id } }),
            this.prisma.subject.findUnique({ where: { id: subject_id }, include: { LecturerSubject: true } })
        ]);

        if (!sender || !receiver || !subject) 
            throw new BadRequestException(`Không tìm thấy sender_id ${sender_id}, receiver_id ${receiver_id} hoặc subject_id ${subject_id}`);

        if (subject.lecturer_subject_manager_id !== receiver_id) 
            throw new BadRequestException("Receiver không phải là Chủ nhiệm học phần");

        const isTeaching = subject.LecturerSubject.some(ls => ls.lecturer_id === sender_id);
        if (!isTeaching) 
            throw new BadRequestException(`Bạn không phải giảng viên dạy môn này, không thể gửi yêu cầu!`);

        const isExistingApprove = await this.prisma.approve.findFirst({
            where: { sender_id, receiver_id, subject_id }
        });

        if (isExistingApprove) 
            throw new BadRequestException("Bạn đã gửi cho Chủ nhiệm học phần rồi, vui lòng đợi duyệt!");

        return value;
    }
}