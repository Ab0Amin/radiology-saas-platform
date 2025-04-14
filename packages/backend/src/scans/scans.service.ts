import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import { Status } from '@prisma/client';

@Injectable()
export class ScansService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.scan.findMany({
      where: { tenantId },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            dob: true,
            mobile: true,
          },
        },
        reports: {
          select: {
            id: true,
            findings: true,
            impression: true,
            createdAt: true,
            doctor: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    const scan = await this.prisma.scan.findFirst({
      where: { id, tenantId },
      include: {
        patient: true,
        reports: {
          include: {
            doctor: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`);
    }

    return scan;
  }

  async create(createScanDto: CreateScanDto, tenantId: string) {
    // Check if patient exists and belongs to the tenant
    const patient = await this.prisma.patient.findFirst({
      where: {
        id: createScanDto.patientId,
        tenantId,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${createScanDto.patientId} not found`);
    }

    return this.prisma.scan.create({
      data: {
        scanType: createScanDto.scanType,
        bodyPart: createScanDto.bodyPart,
        description: createScanDto.description,
        urgency: createScanDto.urgency,
        status: Status.PENDING,
        patientId: createScanDto.patientId,
        tenantId,
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            dob: true,
            mobile: true,
          },
        },
      },
    });
  }

  async update(id: string, updateScanDto: UpdateScanDto, tenantId: string) {
    // Check if scan exists
    const scan = await this.prisma.scan.findFirst({
      where: { id, tenantId },
    });

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`);
    }

    return this.prisma.scan.update({
      where: { id },
      data: updateScanDto,
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            dob: true,
            mobile: true,
          },
        },
      },
    });
  }

  async remove(id: string, tenantId: string) {
    // Check if scan exists
    const scan = await this.prisma.scan.findFirst({
      where: { id, tenantId },
    });

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`);
    }

    // Delete the scan
    await this.prisma.scan.delete({
      where: { id },
    });

    return { id };
  }

  async uploadDicom(id: string, dicomPath: string, tenantId: string) {
    // Check if scan exists
    const scan = await this.prisma.scan.findFirst({
      where: { id, tenantId },
    });

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`);
    }

    return this.prisma.scan.update({
      where: { id },
      data: {
        dicomPath,
        status: Status.IN_PROGRESS,
      },
    });
  }
}