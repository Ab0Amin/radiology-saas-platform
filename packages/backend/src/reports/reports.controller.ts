import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  findAll(@Request() req) {
    return this.reportsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  findOne(@Param('id') id: string, @Request() req) {
    return this.reportsService.findOne(id, req.user.tenantId);
  }

  @Post()
  @Roles(Role.DOCTOR)
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    return this.reportsService.create(
      createReportDto,
      req.user.id,
      req.user.tenantId,
    );
  }

  @Put(':id')
  @Roles(Role.DOCTOR)
  update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
    @Request() req,
  ) {
    return this.reportsService.update(
      id,
      updateReportDto,
      req.user.id,
      req.user.tenantId,
    );
  }

  @Delete(':id')
  @Roles(Role.DOCTOR)
  remove(@Param('id') id: string, @Request() req) {
    return this.reportsService.remove(id, req.user.id, req.user.tenantId);
  }
}