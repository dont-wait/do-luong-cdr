import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloCloService } from './PloClo.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('plo-clo')
export class PloCloController {
  constructor(private readonly ploCloService: PloCloService) {}
  @Get()
  @ApiOperation({summary: 'Get all PloClos'})
  @ApiResponse({status: 200, description: 'Get successful'})
  @ApiResponse({status: 400, description: 'Invalide input data'})
  async getAllPloClo() {
    return this.ploCloService.getAllPloClo();
  }
}
