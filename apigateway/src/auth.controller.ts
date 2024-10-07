import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private readonly authServiceUrl = 'http://localhost:3001';

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return axios.post(`${this.authServiceUrl}/register`, createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return axios.post(`${this.authServiceUrl}/login`, loginDto);
  }
}
