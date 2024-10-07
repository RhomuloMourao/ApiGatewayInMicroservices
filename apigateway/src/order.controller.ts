import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import axios from 'axios';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  private readonly orderServiceUrl = 'http://localhost:3003';

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return axios.post(`${this.orderServiceUrl}`, createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return axios.get(`${this.orderServiceUrl}/${id}`);
  }

  @Get()
  async getAllOrders() {
    return axios.get(`${this.orderServiceUrl}`);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return axios.delete(`${this.orderServiceUrl}/${id}`);
  }
}
