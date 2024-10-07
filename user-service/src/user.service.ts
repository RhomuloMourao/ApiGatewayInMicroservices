import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [];

  async getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async getAllUsers() {
    return this.users;
  }

  async createUser(createUserDto: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = { ...createUserDto, id: Date.now().toString() };
    this.users.push(user);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      return user;
    }
    throw new Error('User not found');
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return { message: 'User deleted successfully' };
    }
    throw new Error('User not found');
  }
}
