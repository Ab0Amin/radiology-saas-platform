import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsDateString()
  dob: string;

  @IsString()
  mobile: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}