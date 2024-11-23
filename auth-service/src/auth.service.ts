import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { logger } from './logger';

@Injectable()
export class AuthService {
  private users = [];
  private readonly logger = new Logger(AuthService.name);

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
    if (user) {
      logger.info(`(auth-service): User logged in with email: ${email}`, {
        context: AuthService.name,
      });
      return { message: '(auth-service): Login successful', user };
    }
    logger.error(`(auth-service): Invalid login attempt for email: ${email}`, {
      context: AuthService.name,
    });
    throw new Error('(auth-service): Invalid credentials');
  }
}
