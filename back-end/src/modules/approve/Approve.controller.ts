import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApproveService } from './Approve.service';
import { CreateApproveDto } from './dto/createApprove';

@Controller("approve")
export class ApproveController {
    constructor(
        private readonly approveService: ApproveService
    ) {}

    @Post()
    public async uploadApprove(@Body() data: CreateApproveDto) {
        return await this.approveService.sendApprove(data);
    }

    @Get(":id")
    public async getApproveByReceiverId(@Param('id') id: string) {
        return await this.approveService.getApproveByReceiverId(id);
    }
}