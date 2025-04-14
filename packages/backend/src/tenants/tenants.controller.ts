import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tenant> {
    return this.tenantsService.findOne(id);
  }

  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tenantsService.remove(id);
  }
}