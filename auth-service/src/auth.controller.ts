import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { logger } from './logger';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    logger.info('(auth-service): User registration request received', {
      context: AuthController.name,
    });
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    logger.info(`(auth-service): Login attempt for email: ${loginDto.email}`, {
      context: AuthController.name,
    });
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
