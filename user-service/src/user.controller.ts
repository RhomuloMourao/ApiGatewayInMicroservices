import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from './logger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sync')
  async syncUser(@Body() userDto: { id: string; name: string; email: string }) {
    logger.info(`(user-service): Synchronizing user with ID: ${userDto.id}`);
    return this.userService.syncUser(userDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    logger.info(`(user-service): Fetching user with ID: ${id}`);
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers() {
    logger.info('(user-service): Fetching all users');
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    logger.info(`(user-service): Updating user with ID: ${id}`);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    logger.warn(`(user-service): Deleting user with ID: ${id}`);
    return this.userService.deleteUser(id);
  }
}
