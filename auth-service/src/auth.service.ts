import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  private users = [];

  async register(createUserDto: CreateUserDto) {
    this.users.push({ ...createUserDto, id: Date.now().toString() });
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      return { message: 'Login successful', user };
    }
    throw new Error('Invalid credentials');
  }
}
