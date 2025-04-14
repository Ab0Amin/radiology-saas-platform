import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScansService } from './scans.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('scans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  findAll(@Request() req) {
    return this.scansService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST, Role.TECHNICIAN)
  findOne(@Param('id') id: string, @Request() req) {
    return this.scansService.findOne(id, req.user.tenantId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.TECHNICIAN)
  create(@Body() createScanDto: CreateScanDto, @Request() req) {
    return this.scansService.create(createScanDto, req.user.tenantId);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.TECHNICIAN)
  update(@Param('id') id: string, @Body() updateScanDto: UpdateScanDto, @Request() req) {
    return this.scansService.update(id, updateScanDto, req.user.tenantId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.scansService.remove(id, req.user.tenantId);
  }

  @Post(':id/upload')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.TECHNICIAN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/dicom',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadDicom(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.scansService.uploadDicom(id, file.path, req.user.tenantId);
  }
}