import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler'; // Guard para Throttling
import { CacheTTL } from '@nestjs/cache-manager'; // Decorador CacheTTL
import axios from 'axios';

@Controller('orders')
@UseGuards(ThrottlerGuard) // Aplicando o throttling globalmente no controlador
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  private readonly orderServiceUrl = 'http://localhost:3003/orders'; // URL do Order Service

  @Post()
  @Throttle({ default: { limit: 6, ttl: 60000 } })
  async createOrder(
    @Body() createOrderDto: { productId: string; quantity: number },
  ) {
    this.logger.log('(api-gateway): Create order request received');
    try {
      const response = await axios.post(
        `${this.orderServiceUrl}`,
        createOrderDto,
      );
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error creating order', error.message);
      throw error;
    }
  }

  @Get(':id')
  @CacheTTL(60)
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  async getOrder(@Param('id') id: string) {
    this.logger.log('(api-gateway): Get order request received');
    try {
      const response = await axios.get(`${this.orderServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error fetching order', error.message);
      throw error;
    }
  }

  @Get()
  @CacheTTL(60)
  @Throttle({ default: { limit: 7, ttl: 60000 } })
  async getAllOrders() {
    this.logger.log('(api-gateway): Get all orders request received');
    try {
      const response = await axios.get(`${this.orderServiceUrl}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error fetching orders', error.message);
      throw error;
    }
  }

  @Delete(':id')
  @SkipThrottle()
  async deleteOrder(@Param('id') id: string) {
    this.logger.log('(api-gateway): Delete order request received');
    try {
      const response = await axios.delete(`${this.orderServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.logger.error('(api-gateway): Error deleting order', error.message);
      throw error;
    }
  }
}
