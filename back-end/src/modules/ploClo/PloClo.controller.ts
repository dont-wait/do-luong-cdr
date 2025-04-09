import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PloCloService } from './PloClo.service';


@Controller('plo-clo')
export class PloCloController {
  constructor(private readonly ploCloService: PloCloService) {}
  @Get()
  getAllPloClo() {
    return this.ploCloService.getAllPloClo();
  }
  
}
