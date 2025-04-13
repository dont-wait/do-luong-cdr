import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/Prisma.service';
import { CreateApproveDto } from './dto/createApprove';
import { UpdateApproveDto } from './dto/updateApprove';
import { SaveData } from 'src/utils/SaveData';
import { ApproveDataDto } from 'src/utils/saveApproveData.dto';
import { ResultService } from '../result/Result.service';
import { QuestionService } from '../question/Question.service';
import { CloService } from '../clo/Clo.service';
import { StudentService } from '../student/Student.service';
import { ExamService } from '../exam/Exam.service';
@Injectable()
export class ApproveService {
    private readonly saveDataUtil: SaveData;

    constructor(
        private readonly prisma: PrismaService,
        private readonly resultService: ResultService,
        private readonly questionService: QuestionService,
        private readonly cloService: CloService,
        private readonly studentService: StudentService,
        private readonly examService: ExamService,
    ) {
      this.saveDataUtil = new SaveData(
        this.resultService,
        this.questionService,
        this.cloService,
        this.studentService,
        this.examService,
      );
    }
  

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
        const { sender_id, receiver_id, approve} = data;
        const existingApprove = await this.prisma.approve.findFirst({
            where: { sender_id, receiver_id },
        });

        if (!existingApprove) {
            throw new NotFoundException(`Không tìm thấy approve giữa sender ${sender_id} và receiver ${receiver_id}`);
        }

        const ApproveSave = await this.getApproveByReceiverId(data.receiver_id);
        
        if (!ApproveSave) {
            throw new NotFoundException(`Không tìm thấy approve với ID: ${data.receiver_id}`);
        }
        for (const approveItem of ApproveSave) {
            try {

              if (approveItem.data && typeof approveItem.data === 'string') {
                const parsedData = JSON.parse(approveItem.data);
                console.log('📦 Parsed Approve Data:', parsedData);
          

                await this.saveDataUtil.saveApprovedData(parsedData);
              } else {
                console.warn('⚠️ Không có dữ liệu JSON hợp lệ trong approve:', approveItem.id);
              }
            } catch (err) {
              console.error('❌ Lỗi parse JSON trong approve:', approveItem.id, err.message);
            }
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