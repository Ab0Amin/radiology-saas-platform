import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser(
        loginDto.username,
        loginDto.password,
      );
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('patient-login')
  @HttpCode(HttpStatus.OK)
  async patientLogin(@Body() loginDto: { mobile: string; dob: string }) {
    try {
      const patient = await this.authService.validatePatient(
        loginDto.mobile,
        loginDto.dob,
      );
      return this.authService.loginPatient(patient);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: { refresh_token: string }) {
    try {
      return this.authService.refreshToken(refreshTokenDto.refresh_token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}