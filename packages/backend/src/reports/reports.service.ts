import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Status, Role } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.report.findMany({
      where: {
        scan: {
          tenantId,
        },
      },
      include: {
        scan: {
          select: {
            id: true,
            scanType: true,
            bodyPart: true,
            status: true,
            patient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        doctor: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    const report = await this.prisma.report.findFirst({
      where: {
        id,
        scan: {
          tenantId,
        },
      },
      include: {
        scan: {
          include: {
            patient: true,
          },
        },
        doctor: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async create(createReportDto: CreateReportDto, doctorId: string, tenantId: string) {
    // Check if scan exists and belongs to the tenant
    const scan = await this.prisma.scan.findFirst({
      where: {
        id: createReportDto.scanId,
        tenantId,
      },
    });

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${createReportDto.scanId} not found`);
    }

    // Check if doctor exists and belongs to the tenant
    const doctor = await this.prisma.user.findFirst({
      where: {
        id: doctorId,
        tenantId,
        role: Role.DOCTOR,
      },
    });

    if (!doctor) {
      throw new ForbiddenException('Only doctors can create reports');
    }

    // Create the report and update scan status
    const report = await this.prisma.$transaction(async (prisma) => {
      const newReport = await prisma.report.create({
        data: {
          findings: createReportDto.findings,
          impression: createReportDto.impression,
          scanId: createReportDto.scanId,
          doctorId,
        },
        include: {
          scan: true,
          doctor: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      // Update scan status to COMPLETED
      await prisma.scan.update({
        where: { id: createReportDto.scanId },
        data: { status: Status.COMPLETED },
      });

      return newReport;
    });

    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto, doctorId: string, tenantId: string) {
    // Check if report exists and belongs to the tenant
    const report = await this.prisma.report.findFirst({
      where: {
        id,
        doctorId,
        scan: {
          tenantId,
        },
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found or you don't have permission to update it`);
    }

    return this.prisma.report.update({
      where: { id },
      data: updateReportDto,
      include: {
        scan: {
          include: {
            patient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        doctor: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string, doctorId: string, tenantId: string) {
    // Check if report exists and belongs to the tenant
    const report = await this.prisma.report.findFirst({
      where: {
        id,
        doctorId,
        scan: {
          tenantId,
        },
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found or you don't have permission to delete it`);
    }

    // Delete the report and update scan status
    await this.prisma.$transaction(async (prisma) => {
      await prisma.report.delete({
        where: { id },
      });

      // Update scan status back to IN_PROGRESS
      await prisma.scan.update({
        where: { id: report.scanId },
        data: { status: Status.IN_PROGRESS },
      });
    });

    return { id };
  }
}