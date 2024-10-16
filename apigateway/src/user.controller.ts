import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  private readonly userServiceUrl = 'http://localhost:3002';

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const response = await axios.get(`${this.userServiceUrl}/${id}`);
    this.logger.log(`Getting user with ID: ${id}`);
    return response.data;
  }

  @CacheKey('all-users')
  @CacheTTL(120)
  @Get()
  async getAllUsers() {
    const response = await axios.get(`${this.userServiceUrl}`);
    this.logger.log('Getting all users');
    return response.data;
  }

  @Post()
  async createUser(
    @Body() createUserDto: { name: string; email: string; password: string },
  ) {
    const response = await axios.post(`${this.userServiceUrl}`, createUserDto);
    this.logger.log(`Creating user: ${JSON.stringify(createUserDto)}`);
    return response.data;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: { name?: string; email?: string; password?: string },
  ) {
    const response = await axios.put(
      `${this.userServiceUrl}/${id}`,
      updateUserDto,
    );
    this.logger.log(`Updating user with ID: ${id}`);
    return response.data;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const response = await axios.delete(`${this.userServiceUrl}/${id}`);
    this.logger.log(`Deleting user with ID: ${id}`);
    return response.data;
  }
}
