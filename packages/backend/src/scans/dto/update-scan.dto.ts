import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ScanType, Urgency, Status } from '@prisma/client';

export class UpdateScanDto {
  @IsEnum(ScanType)
  @IsOptional()
  scanType?: ScanType;

  @IsString()
  @IsOptional()
  bodyPart?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Urgency)
  @IsOptional()
  urgency?: Urgency;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsOptional()
  dicomPath?: string;
}