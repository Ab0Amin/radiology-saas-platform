import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '1d' },
    }),
    TenantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
