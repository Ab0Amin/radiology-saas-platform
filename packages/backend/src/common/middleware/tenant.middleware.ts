import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from '../../tenants/tenants.service';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly dataSource: DataSource,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get tenant from header or subdomain
    const tenantName = req.headers['x-tenant'] as string || this.getTenantFromSubdomain(req);
    
    if (tenantName) {
      try {
        // Find the tenant
        const tenant = await this.tenantsService.findByName(tenantName);
        
        // Set the tenant schema in the query runner
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.query(`SET search_path TO "${tenant.schema}"`);
        
        // Store tenant info in request for later use
        (req as any).tenant = tenant;
        (req as any).tenantQueryRunner = queryRunner;
        
        // Clean up when the response is finished
        res.on('finish', async () => {
          await queryRunner.release();
        });
      } catch (error) {
        // If tenant not found, continue without setting tenant context
        console.error(`Tenant not found: ${tenantName}`, error);
      }
    }
    
    next();
  }

  private getTenantFromSubdomain(req: Request): string | null {
    const host = req.headers.host;
    if (!host) return null;
    
    const parts = host.split('.');
    if (parts.length <= 2) return null; // No subdomain
    
    return parts[0];
  }
}