import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}