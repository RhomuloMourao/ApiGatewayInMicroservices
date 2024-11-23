import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Logger,
  Version,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { logger } from './logger';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @Version('1')
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    logger.info('(order-service): Create order request received', {
      context: OrderController.name,
    });
    return this.orderService.createOrder(createOrderDto);
  }

  @Version('1')
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    logger.info(`(order-service): Get order request for ID: ${id}`, {
      context: OrderController.name,
    });
    return this.orderService.getOrder(id);
  }

  @Get()
  async getAllOrders() {
    logger.info('(order-service): Get all orders request received', {
      context: OrderController.name,
    });
    return this.orderService.getAllOrders();
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    logger.info(`(order-service): Delete order request for ID: ${id}`, {
      context: OrderController.name,
    });
    return this.orderService.deleteOrder(id);
  }
}
