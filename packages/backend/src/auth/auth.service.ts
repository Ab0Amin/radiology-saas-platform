import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { tenant: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password from the returned user object
    const { password: _, ...result } = user;
    return result;
  }

  async validatePatient(mobile: string, dob: string) {
    const patient = await this.prisma.patient.findFirst({
      where: {
        mobile,
        dob: new Date(dob),
      },
      include: { tenant: true },
    });

    if (!patient) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return patient;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      tenantId: user.tenantId,
      tenantName: user.tenant.name,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
        tenantName: user.tenant.name,
      },
    };
  }

  async loginPatient(patient: any) {
    const payload = {
      sub: patient.id,
      type: 'patient',
      tenantId: patient.tenantId,
      tenantName: patient.tenant.name,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      patient: {
        id: patient.id,
        name: patient.name,
        mobile: patient.mobile,
        dob: patient.dob,
        tenantId: patient.tenantId,
        tenantName: patient.tenant.name,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const { sub, username, role, tenantId, tenantName } = payload;

      const newPayload = {
        sub,
        username,
        role,
        tenantId,
        tenantName,
      };

      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(createUserDto: any, tenantId: string) {
    // Check if username already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: createUserDto.role || Role.RECEPTIONIST,
        tenantId,
      },
      include: { tenant: true },
    });

    // Remove password from the returned user object
    const { password: _, ...result } = user;
    return result;
  }
}