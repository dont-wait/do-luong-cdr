import { Module } from "@nestjs/common";
import { ExamDetailService } from "./ExamDetail.service";
import { ExamDetailController } from "./ExamDetail.controller";

@Module({
    imports: [],
    controllers: [ExamDetailController],
    providers: [ExamDetailService],
    exports: [ExamDetailService],
})

export class ExamDetailModule {}