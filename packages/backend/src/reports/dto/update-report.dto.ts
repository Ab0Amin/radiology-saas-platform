import { IsString, IsOptional } from 'class-validator';

export class UpdateReportDto {
  @IsString()
  @IsOptional()
  findings?: string;

  @IsString()
  @IsOptional()
  impression?: string;
}