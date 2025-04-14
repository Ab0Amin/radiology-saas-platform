import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  findings: string;

  @IsString()
  impression: string;

  @IsString()
  scanId: string;
}