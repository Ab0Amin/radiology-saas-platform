import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ScanType, Urgency } from '@prisma/client';

export class CreateScanDto {
  @IsEnum(ScanType)
  scanType: ScanType;

  @IsString()
  bodyPart: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Urgency)
  @IsOptional()
  urgency?: Urgency;

  @IsString()
  patientId: string;
}