import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import axios from 'axios';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  private readonly userServiceUrl = 'http://localhost:3002';

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return axios.get(`${this.userServiceUrl}/${id}`);
  }

  @Get()
  async getAllUsers() {
    return axios.get(`${this.userServiceUrl}`);
  }

  @Post()
  async createUser(
    @Body() createUserDto: { name: string; email: string; password: string },
  ) {
    return axios.post(`${this.userServiceUrl}`, createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return axios.put(`${this.userServiceUrl}/${id}`, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return axios.delete(`${this.userServiceUrl}/${id}`);
  }
}
