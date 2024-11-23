import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from './logger';

@Injectable()
export class UserService {
  private users = [];

  async syncUser(userDto: { id: string; name: string; email: string }) {
    const existingUser = this.users.find((user) => user.id === userDto.id);
    if (!existingUser) {
      this.users.push(userDto);
      logger.info(`(user-service): User synchronized with ID: ${userDto.id}`);
      return { message: '(user-service): User synchronized successfully' };
    }
    logger.warn(`(user-service): User with ID: ${userDto.id} already exists`);
    return { message: '(user-service): User already exists' };
  }

  async getUser(id: string) {
    logger.info(`(user-service): Searching for user with ID: ${id}`);
    return this.users.find((user) => user.id === id);
  }

  async getAllUsers() {
    logger.info('(user-service): Retrieving all users');
    return this.users;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      logger.info(`(user-service): User with ID: ${id} updated`);
      return user;
    }
    logger.error(`(user-service): User with ID: ${id} not found for update`);
    throw new Error('(user-service): User not found');
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      logger.warn(`(user-service): User with ID: ${id} deleted`);
      return { message: '(user-service): User deleted successfully' };
    }
    logger.error(`(user-service): User with ID: ${id} not found for deletion`);
    throw new Error('(user-service): User not found');
  }
}
