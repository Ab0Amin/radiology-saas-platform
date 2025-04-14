import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.patient.findMany({
      where: { tenantId },
      include: {
        scans: {
          select: {
            id: true,
            scanType: true,
            bodyPart: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, tenantId },
      include: {
        scans: {
          select: {
            id: true,
            scanType: true,
            bodyPart: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async create(createPatientDto: CreatePatientDto, tenantId: string) {
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        dob: new Date(createPatientDto.dob),
        tenantId,
      },
    });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto, tenantId: string) {
    // Check if patient exists
    const patient = await this.prisma.patient.findFirst({
      where: { id, tenantId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    // Update the patient
    let data = { ...updatePatientDto };
    if (updatePatientDto.dob) {
      data.dob = new Date(updatePatientDto.dob);
    }

    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, tenantId: string) {
    // Check if patient exists
    const patient = await this.prisma.patient.findFirst({
      where: { id, tenantId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    // Delete the patient
    await this.prisma.patient.delete({
      where: { id },
    });

    return { id };
  }

  async findByMobileAndDob(mobile: string, dob: string, tenantId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: {
        mobile,
        dob: new Date(dob),
        tenantId,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }
}