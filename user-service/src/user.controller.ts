import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  Post,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from './logger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('sync')
  async syncUser(@Body() userDto: { id: string; name: string; email: string }) {
    logger.info(`(user-service): Synchronizing user with ID: ${userDto.id}`);
    return this.userService.syncUser(userDto);
  }

  @Version('1')
  @Get(':id')
  async getUser(@Param('id') id: string) {
    logger.info(`(user-service): Fetching user with ID: ${id}`);
    return this.userService.getUser(id);
  }

  @Version('1')
  @Get()
  async getAllUsers() {
    logger.info('(user-service): Fetching all users');
    return this.userService.getAllUsers();
  }

  @Version('1')
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    logger.info(`(user-service): Updating user with ID: ${id}`);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Version('1')
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    logger.warn(`(user-service): Deleting user with ID: ${id}`);
    return this.userService.deleteUser(id);
  }
}
