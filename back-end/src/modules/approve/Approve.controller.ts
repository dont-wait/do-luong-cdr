import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApproveService } from './Approve.service';
import { CreateApproveDto } from './dto/createApprove';
import { UpdateApproveDto } from './dto/updateApprove';
import { ApproveValidatePipe } from 'src/common/pipe/ApproveValidate.pipe';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';


@ApiTags('approve')
@Controller("approve")
export class ApproveController {
    constructor(
        private readonly approveService: ApproveService
    ) {}

    @Post()
    @UsePipes(ApproveValidatePipe)
    @ApiOperation({ summary: 'Create a new approve request' })
    @ApiResponse({ status: 201, description: 'The approve request has been created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    public async uploadApprove(@Body() data: CreateApproveDto) {
        return await this.approveService.sendApprove(data);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get approve requests by receiver ID' })
    @ApiParam({ name: 'id', description: 'Receiver ID' })
    @ApiResponse({ status: 200, description: 'Return the approve requests.' })
    @ApiResponse({ status: 404, description: 'Not found.' })
    public async getApproveByReceiverId(@Param('id') id: string) {
        return await this.approveService.getApproveByReceiverId(id);
    }

    @Put()
    @ApiOperation({ summary: 'Update an approve request' })
    @ApiResponse({ status: 200, description: 'The approve request has been updated successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    public async updateApprove(@Body() data: UpdateApproveDto) {
        return await this.approveService.updateApprove(data);
    }

    
}