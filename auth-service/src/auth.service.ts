import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { logger } from './logger';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  private users = [];
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret = 'secret-key';
  private readonly tokenExpiration = '7d';

  constructor(private readonly httpService: HttpService) {}

  async register(createUserDto: CreateUserDto) {
    const user = { ...createUserDto, id: Date.now().toString() };
    this.users.push(user);

    logger.info(`(auth-service): User registered with ID: ${user.id}`, {
      context: AuthService.name,
    });

    try {
      await lastValueFrom(
        this.httpService.post('http://localhost:3002/users/sync', user),
      );
    } catch (error) {
      logger.error(
        `(auth-service): Failed to synchronize user with User-Service: ${error.message}`,
        { context: AuthService.name },
      );
    }

    return { message: '(auth-service): User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      logger.error(
        `(auth-service): Invalid login attempt for email: ${email}`,
        {
          context: AuthService.name,
        },
      );
      throw new UnauthorizedException('(auth-service): Invalid credentials');
    }

    logger.info(`(auth-service): User logged in with email: ${email}`, {
      context: AuthService.name,
    });

    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.tokenExpiration,
    });

    return { message: '(auth-service): Login successful', token };
  }
}
