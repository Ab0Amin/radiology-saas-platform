import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  findAll(@Request() req) {
    return this.patientsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  findOne(@Param('id') id: string, @Request() req) {
    return this.patientsService.findOne(id, req.user.tenantId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  create(@Body() createPatientDto: CreatePatientDto, @Request() req) {
    return this.patientsService.create(createPatientDto, req.user.tenantId);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Request() req) {
    return this.patientsService.update(id, updatePatientDto, req.user.tenantId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.patientsService.remove(id, req.user.tenantId);
  }

  @Post('verify')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  verifyPatient(@Body() verifyDto: { mobile: string; dob: string }, @Request() req) {
    return this.patientsService.findByMobileAndDob(
      verifyDto.mobile,
      verifyDto.dob,
      req.user.tenantId,
    );
  }
}