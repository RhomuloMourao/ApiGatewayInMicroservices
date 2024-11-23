import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CacheTTL } from '@nestjs/cache-manager';
import axios from 'axios';

@Controller('users')
@UseGuards(ThrottlerGuard)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  private readonly userServiceUrl = 'http://localhost:3002/users';

  @Get(':id')
  @CacheTTL(60)
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  async getUser(@Param('id') id: string) {
    this.logger.log('(api-gateway): Get user request received');
    try {
      const response = await axios.get(`${this.userServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error fetching user', error.message);
      throw error;
    }
  }

  @Get()
  @CacheTTL(60)
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  async getAllUsers() {
    this.logger.log('(api-gateway): Get all users request received');
    try {
      const response = await axios.get(`${this.userServiceUrl}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error fetching users', error.message);
      throw error;
    }
  }

  @Put(':id')
  @SkipThrottle()
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    this.logger.log('(api-gateway): Update user request received');
    try {
      const response = await axios.put(
        `${this.userServiceUrl}/${id}`,
        updateUserDto,
      );
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error updating user', error.message);
      throw error;
    }
  }

  @Delete(':id')
  @SkipThrottle()
  async deleteUser(@Param('id') id: string) {
    this.logger.log('(api-gateway): Delete user request received');
    try {
      const response = await axios.delete(`${this.userServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error deleting user', error.message);
      throw error;
    }
  }
}
