import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApproveService } from './Approve.service';
import { CreateApproveDto } from './dto/createApprove';
import { UpdateApproveDto } from './dto/updateApprove';
import { ApproveValidatePipe } from 'src/common/pipe/ApproveValidate.pipe';

@Controller("approve")
export class ApproveController {
    constructor(
        private readonly approveService: ApproveService
    ) {}

    @Post()
    @UsePipes(ApproveValidatePipe)
    public async uploadApprove(@Body() data: CreateApproveDto) {
        return await this.approveService.sendApprove(data);
    }

    @Get(":id")
    public async getApproveByReceiverId(@Param('id') id: string) {
        return await this.approveService.getApproveByReceiverId(id);
    }

    @Put()
    public async updateApprove(@Body() data: UpdateApproveDto) {
        return await this.approveService.updateApprove(data);
    }
}