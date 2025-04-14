import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }

  async findByName(name: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { name } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with name ${name} not found`);
    }
    return tenant;
  }

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Check if tenant with the same name already exists
    const existingTenant = await this.tenantsRepository.findOne({ 
      where: { name: createTenantDto.name } 
    });
    
    if (existingTenant) {
      throw new ConflictException(`Tenant with name ${createTenantDto.name} already exists`);
    }
    
    // Generate a schema name based on the tenant name
    const schemaName = createTenantDto.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Create the tenant record
    const tenant = this.tenantsRepository.create({
      ...createTenantDto,
      schema: schemaName,
    });
    
    // Save the tenant
    const savedTenant = await this.tenantsRepository.save(tenant);
    
    // Create the schema for the tenant
    await this.createTenantSchema(schemaName);
    
    return savedTenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);
    
    // Update tenant properties
    Object.assign(tenant, updateTenantDto);
    
    // Save the updated tenant
    return this.tenantsRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const tenant = await this.findOne(id);
    await this.tenantsRepository.remove(tenant);
    
    // Note: We're not dropping the schema here for safety reasons
    // In a real-world application, you might want to archive the data instead
  }

  private async createTenantSchema(schemaName: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      
      // Create the schema
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
      
      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}