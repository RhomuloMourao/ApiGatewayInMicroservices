import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import axios from 'axios';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly authServiceUrl = 'http://localhost:3001/auth';

  @Post('login')
  @SkipThrottle()
  async login(@Body() loginDto: { email: string; password: string }) {
    this.logger.log('(api-gateway): Login request received');
    try {
      const response = await axios.post(
        `${this.authServiceUrl}/login`,
        loginDto,
      );
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error during login', error.message);
      throw error;
    }
  }

  @Post('register')
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  async register(
    @Body() createUserDto: { name: string; email: string; password: string },
  ) {
    this.logger.log('(api-gateway): Register request received');
    try {
      const response = await axios.post(
        `${this.authServiceUrl}/register`,
        createUserDto,
      );
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error during register', error.message);
      throw error;
    }
  }
}
